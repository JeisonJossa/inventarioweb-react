// Importamos las librerías necesarias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearArticulo } from "../../api/articulos";

// Función principal del componente
const AgregarArticulo = () => {

    // Definimos el estado inicial del componente con useState
    const [articulo, setArticulo] = useState({
        idarticulo: 0,
        nombrearticulo: '',
        PrecioArticulo: 0,
        CantidadStock: 0,
        EstadoArticulo: 0
    });

    // Esta función maneja el cambio en los campos del formulario y actualiza el estado
    const manejarCambio = (e) => {
        setArticulo({
            ...articulo,
            [e.target.name]: e.target.value
        });
    };
    // Utilizamos useNavigate para redireccionar al usuario después del inicio de sesión
    let navegar = useNavigate();

    // Esta función se ejecuta cuando se envía el formulario
    const agregarArticulo = async (e) => {
        // Prevenimos el comportamiento por defecto del formulario
        e.preventDefault();

        // Convertimos los campos relevantes a números enteros
        articulo.PrecioArticulo = parseInt(articulo.PrecioArticulo);
        articulo.CantidadStock = parseInt(articulo.CantidadStock);
        if (articulo.EstadoArticulo === '0') {
            articulo.EstadoArticulo = 0
        }else {
            articulo.EstadoArticulo = 1
        }


        // Aquí hacemos la petición a la API para crear el usuario
        const resultado = await crearArticulo(articulo);

        if (resultado) {
            alert('Articulo creado exitosamente');
            // Redirigimos al usuario a la página de inicio de sesión
            navegar('/productos');
        } else {
            alert('Hubo un error al crear el Articulo');
        }
    };

    // Renderizamos el formulario de creación de usuario
    return (
        <div>
            <form onSubmit={agregarArticulo}>
                Nombre de Articulo:
                <input type="text" name="nombrearticulo" onChange={manejarCambio} required />
                <br/>
                Precio del Articulo:
                <input type="number" name="PrecioArticulo" onChange={manejarCambio} required />
                <br/>
                Cantidad en Stock:
                <input type="number" name="CantidadStock" onChange={manejarCambio} required />
                <br/>
                Estado del Articulo:

                <select name="EstadoArticulo" onChange={manejarCambio} required >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
                <br/>
                <button type="submit">Crear Articulo</button>
            </form>
            <button onClick={() => navegar('/productos')}>Cancelar</button>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default AgregarArticulo;
