// Importamos las librerías necesarias
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerArticulo, actualizarArticulo } from "../../api/articulos";

// Función principal del componente
const EditarArticulo = () => {

    // Definimos el estado inicial del componente con useState
    const [articulo, setArticulo] = useState({
        idarticulo: 0,
        nombrearticulo: '',
        PrecioArticulo: 0,
        CantidadStock: 0,
        EstadoArticulo: 0
    });

    // Utilizamos useNavigate para redireccionar al usuario después del inicio de sesión
    let navegar = useNavigate();

    // Utilizamos useParams para obtener el id del artículo de la URL
    let { id } = useParams();

    useEffect(() => {
        const fetchArticulo = async () => {
            const articuloObtenido = await obtenerArticulo(id);
            setArticulo(articuloObtenido);
        };
        fetchArticulo();
    }, [id]);

    // Esta función maneja el cambio en los campos del formulario y actualiza el estado
    const manejarCambio = (e) => {
        setArticulo({
            ...articulo,
            [e.target.name]: e.target.value
        });
    };

    // Esta función se ejecuta cuando se envía el formulario
    const editarArticulo = async (e) => {
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

        // Aquí hacemos la petición a la API para actualizar el artículo
        const resultado = await actualizarArticulo(articulo);

        if (resultado) {


            alert('Articulo actualizado exitosamente');
            // Redirigimos al usuario a la página de productos
            navegar('/productos');
        } else {
            alert('Hubo un error al actualizar el Articulo');
        }
    };

    // Renderizamos el formulario de edición de artículo
    return (
        <div>
            <form onSubmit={editarArticulo}>
                Nombre de Articulo:
                <input type="text" name="nombrearticulo" value={articulo.nombrearticulo} onChange={manejarCambio} required />
                <br/>
                Precio del Articulo:
                <input type="number" name="PrecioArticulo" value={articulo.PrecioArticulo} onChange={manejarCambio} required />
                <br/>
                Cantidad en Stock:
                <input type="number" name="CantidadStock" value={articulo.CantidadStock} onChange={manejarCambio} required />
                <br/>
                Estado del Articulo:
                <select name="EstadoArticulo" onChange={manejarCambio} required  value={articulo.EstadoArticulo}>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
                <br/>
                <button type="submit">Actualizar Articulo</button>
            </form>

            <button onClick={() => navegar('/productos')}>Cancelar</button>

        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default EditarArticulo
