// Importamos axios
import axios from 'axios';

// Definimos la URL base de la API
const API_URL = 'http://localhost:3000/inventarioweb/movimientoinventario/';

// Función para obtener los datos de todos los movimientos de inventario
export const obtenerMovimientos = async () => {
    try {
        const respuesta = await axios.get(API_URL+'todos');
        console.log(respuesta);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Función para obtener los datos de un movimiento de inventario por su id
export const obtenerMovimiento = async (id) => {
    try {
        const respuesta = await axios.get(API_URL + 'movimiento', {
            headers: {
                idmovimiento: id
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para crear un nuevo movimiento de inventario
export const crearMovimiento = async (movimiento) => {
    try {
        const respuesta = await axios.post(API_URL + 'crear', movimiento);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para actualizar un movimiento de inventario por su id
export const actualizarMovimiento = async (movimiento) => {
    try {
        const respuesta = await axios.put(API_URL + 'actualizar', movimiento, {
            headers: {
                idmovimiento: movimiento.idmovimiento
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la ruta para eliminar un movimiento de inventario por su id
export const eliminarMovimiento = async (id) => {
    try {
        const respuesta = await axios.delete(API_URL + 'eliminar', {
            headers: {
                idmovimiento: id
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};
