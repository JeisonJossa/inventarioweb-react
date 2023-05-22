// Importamos axios
import axios from 'axios';

// Definimos la URL base de la API
const API_URL = 'http://localhost:3000/inventarioweb/articulos/';

// Función para obtener los datos de todos los articulos
export const obtenerArticulos = async () => {
    try {
        const respuesta = await axios.get(API_URL+'todos');
        console.log(respuesta);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Función para obtener los datos de un articulo por su id
export const obtenerArticulo = async (id) => {
    try {
        const respuesta = await axios.get(API_URL + 'articulo', {
            headers: {
                idarticulo: id
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para crear un nuevo articulo
export const crearArticulo = async (articulo) => {
    try {
        const respuesta = await axios.post(API_URL + 'crear', articulo);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para actualizar un articulo por su id
export const actualizarArticulo = async (articulo) => {
    try {
        const respuesta = await axios.put(API_URL + 'actualizar', articulo, {
            headers: {
                idarticulo: articulo.idarticulo
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la ruta para eliminar un articulo por su id
export const eliminarArticulo = async (id) => {
    try {
        const respuesta = await axios.delete(API_URL + 'eliminar', {
            headers: {
                idarticulo: id
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};
