// Importamos las librerías necesarias
import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { obtenerArticulo } from "../../api/articulos";

// Función principal del componente
const VerDetalleArticulo = () => {

    // Definimos el estado inicial del componente con useState
    const [articulo, setArticulo] = useState(null);

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

    // Renderizamos los detalles del artículo
    return (
        <div>
            {articulo ? (
                <div>
                    <h2>Detalles del Articulo</h2>
                    <p>Nombre de Articulo: {articulo.nombrearticulo}</p>
                    <p>Precio del Articulo: {articulo.PrecioArticulo}</p>
                    <p>Cantidad en Stock: {articulo.CantidadStock}</p>
                    <p>Estado del Articulo: {articulo.EstadoArticulo === 1 ? 'Activo' : 'Inactivo'}</p>
                    <button onClick={() => navegar('/productos')}>Volver</button>
                </div>
            ) : (
                <p>Cargando detalles del articulo...</p>
            )}
        </div>

    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default VerDetalleArticulo;
