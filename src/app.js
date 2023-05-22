// Importación de módulos generales necesarios para toda la pagina
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProveedorAutenticacion, useAuth } from './contextoAutenticacion';
import Cabecera from './componentes/diseno/cabecera';
import MenuExterno from './componentes/diseno/menuexterno';
import MenuPrincipal from "./componentes/diseno/menuprincipal";
import PiePagina from './componentes/diseno/piepagina';
import NoEncontrado from './paginas/noencontrado';

// Importación de módulos y componentes necesarios para el index
import Inicio from './paginas/inicio';
import Login from './componentes/autenticacion/iniciarsesion';
import Registro from './componentes/formularios/formulario_registro_usuario';
import RecuperarContrasena from './componentes/autenticacion/recuperar_contrasena'

// Importación de módulos y componentes necesarios para la pagina de inico
import Dashboard from './paginas/dashboard';
import Configuracion from './paginas/inicio/configuracion';
import Informes from './paginas/inicio/informes';
import Inventario from './paginas/inicio/inventario';
import Articulos from './paginas/inicio/articulos';
import Usuarios from './paginas/inicio/usuarios';

// Importación de módulos y componentes necesarios para la pagina de Configuracion
import AlertasStockMinimo from './paginas/configuracion/alertas_stock_minimo';

import EditarPerfil from './paginas/configuracion/editarperfil';

// Importación de módulos y componentes necesarios para la pagina de Informes
import ExportarInventario from './paginas/informes/exportar_datos_inventario';

// Importación de módulos y componentes necesarios para la pagina de Inventario
import AgregarMovimientoInventario from './paginas/inventario/agregar_movimiento_inventario';
import EditarMovimientoInventario from './paginas/inventario/editar_movimiento_inventario';

// Importación de módulos y componentes necesarios para la pagina de Articulos
import AgregarProducto from './paginas/articulos/agregar_articulo';
import EditarProducto from './paginas/articulos/editar_articulo';
import VerDetalleProducto from './paginas/articulos/ver_detalle_articulo';

// Importación de módulos y componentes necesarios para la pagina de Usuarios
import AgregarUsuario from './paginas/usuarios/agregar_usuario';
import EditarUsuario from './paginas/usuarios/editar_usuario';

import 'bootstrap/dist/css/bootstrap.min.css';

//import './estilos/app.css';

// Definición del componente principal de la aplicación
function App() {
    return (
        <ProveedorAutenticacion>
           <BrowserRouter>
               <Cabecera/>
               <AutenticacionYMenu/>
               <Routes>
                   <Route path="/" element={<Inicio />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/registro" element={<Registro />} />
                   <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
                   <Route path="*" element={<NoEncontrado/>} />

                   <Route path="/inicio" element={<Dashboard />} />
                   <Route path="/productos" element={<Articulos />} />
                   <Route path="/inventario" element={<Inventario />} />
                   <Route path="/informes" element={<Informes />} />
                   <Route path="/usuarios" element={<Usuarios />} />
                   <Route path="/configuracion" element={<Configuracion />} />

                   <Route path="/usuarios/agregarusuario" element={<AgregarUsuario/>}/>
                   <Route path="/usuarios/editarusuario" element={<EditarUsuario/>}/>
                   <Route path="/usuarios/editarusuario/:correo" element={<EditarUsuario />} />

                   <Route path="/productos/agregararticulo" element={<AgregarProducto/>}/>
                   <Route path="/productos/editararticulo" element={<EditarProducto/>}/>
                   <Route path="/productos/editararticulo/:id" element={<EditarProducto/>}/>
                   <Route path="/productos/verdetalle/:id" element={<VerDetalleProducto/>}/>

                   <Route path="/inventario/agregarmovimiento" element={<AgregarMovimientoInventario/>}/>
                   <Route path="/inventario/editarmovimiento" element={<EditarMovimientoInventario/>}/>
                   <Route path="/inventario/editarmovimiento/:id" element={<EditarMovimientoInventario/>}/>

                   <Route path="/configuracion/alertasstock" element={<AlertasStockMinimo/>}/>
                   <Route path="/configuracion/editarperfil" element={<EditarPerfil/>}/>

                   <Route path="/informes/exportardatos" element={<ExportarInventario/>}/>

               </Routes>

               <PiePagina/>
           </BrowserRouter>
        </ProveedorAutenticacion>
    );
}
function AutenticacionYMenu() {
    const auth = useAuth();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            auth.establecerAutenticacion(true, usuario); // Modificada
        }
    }, [auth]);

    return (
        auth.estaAutenticado ? <MenuPrincipal/> : <MenuExterno/>
    )
}

export default App;
