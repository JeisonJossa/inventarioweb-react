// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextoAutenticacion';
import { obtenerArticulos, eliminarArticulo } from '../../api/articulos';

// Componente que muestra la página de Articulos
function Articulos() {
    // Usamos useNavigate para poder navegar a otras rutas
    const navegar = useNavigate();

    // Usamos useAuth para obtener el estado de autenticación del usuario
    const auth = useAuth();

    // Verificamos si el usuario está autenticado, si no, redirigimos a la página de inicio de sesión
    useEffect(() => {
        if (!auth.estaAutenticado) {
            // Redirigimos al usuario a la página de inicio de sesión
            navegar('/');
            // Recargamos la página después de 1 segundo
            setTimeout(() => window.location.reload(), 1000);
        } else {
            // Si el usuario está autenticado, obtenemos la lista de Articulos
            obtenerArticulos().then((data) => {
                setArticulos(data);
            });
        }
    }, [auth.estaAutenticado, navegar]);

    // Definimos el estado de los Articulos y del Articulo seleccionado
    const [articulos, setArticulos] = useState([]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

    // Funcion para listar los Articulos
    const listarArticulos = async () => {
        const articulosObtenidos = await obtenerArticulos();
        if (articulosObtenidos) {
            setArticulos(articulosObtenidos);
        }
    }

    // Función para eliminar el Articulo seleccionado
    const eliminarArticuloSeleccionado = async () => {
        if (articuloSeleccionado) {
            if (window.confirm(`¿Estás seguro que deseas eliminar el artículo: ${articuloSeleccionado.nombrearticulo} ?`)) {
                const resultado = await eliminarArticulo(articuloSeleccionado.idarticulo);
                if (resultado) {
                    setArticulos(articulos.filter(a => a.id !== articuloSeleccionado.idarticulo));
                    setArticuloSeleccionado(null);
                    alert("Artículo eliminado correctamente");
                    listarArticulos()
                } else {
                    alert("No se pudo eliminar el artículo");
                    listarArticulos()
                }
            }
        } else {
            alert("No tienes seleccionado ningun artículo.");
        }

    };

    return (
        <div>
            <h1>Articulos</h1>
            <button
                onClick={() => {
                    if (articuloSeleccionado) {
                        navegar(`/productos/verdetalle/${articuloSeleccionado.idarticulo}`);
                    } else {
                        alert('Por favor, selecciona un artículo para Ver Detalle');
                    }
                }}
            >
                Ver detalle Articulo
            </button>
            <button onClick={() => navegar('agregararticulo')}>Agregar artículo</button>
            <button
                onClick={() => {
                    if (articuloSeleccionado) {
                        navegar(`/productos/editararticulo/${articuloSeleccionado.idarticulo}`);
                    } else {
                        alert('Por favor, selecciona un artículo para editar');
                    }
                }}
            >
                Editar artículo
            </button>
            <button onClick={eliminarArticuloSeleccionado}>Eliminar artículo</button>
            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <table>
                    <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articulos.map((articulo) => (
                        <tr key={articulo.idarticulo} onClick={() => setArticuloSeleccionado(articulo)}>
                            <td>{articulo.nombrearticulo}</td>
                            <td>{articulo.PrecioArticulo}</td>
                            <td>{articulo.CantidadStock}</td>
                            <td>{articulo.EstadoArticulo? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Articulos;
