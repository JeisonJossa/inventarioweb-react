// Importamos axios
import axios from 'axios';

// Definimos la URL base de la API
const API_URL = 'http://localhost:3000/inventarioweb/usuarios/';

// Función para obtener los datos de todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const respuesta = await axios.get(API_URL+'todos');
        console.log(respuesta);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Función para obtener los datos de un usuario por su CorreoElectronico
export const obtenerUsuario = async (correo) => {
    try {
        const respuesta = await axios.get(API_URL + 'usuario', {
            headers: {
                correoelectronico: correo
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para crear un nuevo usuario
export const crearUsuario = async (usuario) => {
    try {
        const respuesta = await axios.post(API_URL + 'crear', usuario);
        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la Función para actualizar un usuario por su CorreoElectronico
export const actualizarUsuario = async (usuario,correo) => {
    try {
        const respuesta = await axios.put(API_URL + 'actualizar', usuario, {
            headers: {
                correoelectronico: correo
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};

// Definimos la ruta para eliminar un usuario por su CorreoElectronico
export const eliminarUsuario = async (correo) => {
    try {
        const respuesta = await axios.delete(API_URL + 'eliminar', {
            headers: {
                correoelectronico: correo
            }
        });

        return respuesta.data;
    } catch (error) {
        console.error('Hubo un error al hacer la petición a la API:', error);
        return null;
    }
};
