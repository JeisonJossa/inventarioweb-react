// Importamos axios
import axios from 'axios';

// Definimos la URL base de la API
const API_URL = 'http://localhost:3000/inventarioweb/alertastock/';

// Función para obtener los datos de todas las alertas
export const obtenerAlertas = async () => {
    try {
        const respuesta = await axios.get(API_URL+'todos');
        console.log(respuesta);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Función para obtener los datos de una alerta por su id
export const obtenerAlerta = async (idalertastock) => {
    try {
        const respuesta = await axios.get(API_URL + 'alertastock', {
            headers: {
                idalertastock: idalertastock
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para crear una nueva alerta
export const crearAlerta = async (alerta) => {
    try {
        const respuesta = await axios.post(API_URL + 'crear', alerta);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para actualizar una alerta por su id
export const actualizarAlerta = async (alerta) => {
    try {
        const respuesta = await axios.put(API_URL + 'actualizar', alerta, {
            headers: {
                idalertastock: alerta.idalertastock
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la ruta para eliminar una alerta por su id
export const eliminarAlerta = async (idalertastock) => {
    try {
        const respuesta = await axios.delete(API_URL + 'eliminar', {
            headers: {
                idalertastock: idalertastock
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};
