// Importamos las librerías y funciones necesarias de React, react-router-dom y de nuestro archivo personalizado de la API.
import React, { useState, useEffect } from 'react'; // Importamos React, useState y useEffect desde la biblioteca 'react'.
import { useNavigate, useParams } from 'react-router-dom'; // Importamos useNavigate y useParams desde 'react-router-dom'.
import { obtenerUsuario, actualizarUsuario } from '../../api/usuarios';

// Componente principal
const EditarUsuario = () => {
    // useNavigate es un hook que proporciona navegación programática. Nos permite navegar a diferentes rutas en nuestra aplicación.
    const navegar = useNavigate();
    // useParams es un hook que permite acceder a los parámetros de la ruta. En este caso, estamos extrayendo el parámetro 'correo' de la URL.
    const { correo } = useParams();

    // useState es un hook que permite a los componentes de React tener estado. Aquí, estamos inicializando el estado del usuario con un objeto.
    const [usuario, setUsuario] = useState({
        IdUsuario: 0,
        NombreUsuario: '',
        CorreoElectronico: '',
        Contrasena: '',
        EsAdmin: 0
    });

    // useEffect es un hook que permite realizar efectos secundarios en componentes funcionales. Se ejecuta después de que el renderizado esté completo.
    // En este caso, estamos haciendo una llamada a la API para obtener los detalles del usuario cuando el componente se monta.
    useEffect(() => {
        obtenerUsuario(correo).then((data) => {
            if (data) {
                setUsuario(data); // Si la llamada a la API tiene éxito, actualizamos el estado del usuario con los datos recibidos.
            }
        });
    }, [correo]); // Este efecto se ejecuta solo cuando el valor del correo cambia.

    // Esta función maneja el cambio en los campos del formulario y actualiza el estado del usuario.
    const manejarCambio = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUsuario({
            ...usuario, // Mantenemos los valores existentes en el estado del usuario.
            [e.target.name]: e.target.value // Y actualizamos el valor del campo que cambió.
        });
    };

    // Esta función se ejecuta cuando se envía el formulario.
    const actualizarUsuarioExistente = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario.

        // Hacemos una petición a la API para actualizar los datos del usuario.
        const usuarioActualizado = await actualizarUsuario(usuario, correo);
        if (usuarioActualizado) {
            // Si la actualización es exitosa, redirigimos al usuario a la página de usuarios
            alert('Usuario actualizado exitosamente.');
            navegar('/usuarios');
        } else {
            // Si algo sale mal, mostramos un mensaje de error.
            // y redirigimos al usuario a la página de usuarios.
            alert('Hubo un error al actualizar el usuario');
            navegar('/usuarios');
        }
    };

     // Renderizamos el formulario de edición de usuario
    return (
        <div>
            <form onSubmit={actualizarUsuarioExistente}>
                <label>
                    Nombre del usuario:
                    <input type="text" name="NombreUsuario" value={usuario.NombreUsuario} onChange={manejarCambio} required />
                </label>
                <br/>
                <label>
                    Correo Electrónico:
                    <input type="email" name="CorreoElectronico" value={usuario.CorreoElectronico} onChange={manejarCambio} required />
                </label>
                <br/>
                <label>
                    Contraseña:
                    <input type="password" name="Contrasena" value={usuario.Contrasena} onChange={manejarCambio} required />
                </label>
                <br/>
                <label>
                    Administrador:
                    <input type="checkbox" name="EsAdmin" checked={usuario.EsAdmin} onChange={manejarCambio} />
                </label>
                <br/>
                <button type="submit">Actualizar Usuario</button>
            </form>
            <button onClick={() => navegar('/usuarios')}>Cancelar</button>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default EditarUsuario;
