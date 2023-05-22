// Importamos las librerías necesarias
import React, { useState } from 'react';
import {obtenerUsuario} from "../../api/usuarios";
import {useNavigate} from "react-router-dom";
import emailjs from 'emailjs-com';

// Función principal del componente
const RecuperarContrasena = () => {

    // Utilizamos useNavigate para redireccionar al usuario después del inicio de sesión
    let navegar = useNavigate();

    // Definimos el estado inicial del componente con useState
    const [correo, setCorreo] = useState("");

    // Esta función maneja el cambio en los campos del formulario y actualiza el estado
    const manejarCambio = (e) => {
        setCorreo(e.target.value);
    };


    // Esta función se ejecuta cuando se envía el formulario
    const recuperarContrasena = async (e) => {
        // Prevenimos el comportamiento por defecto del formulario
        e.preventDefault();
        // Aquí hacemos la petición a la API para obtener los datos del usuario
        const usuario = await obtenerUsuario(correo);

        //Si se encuentra el usuario se envia un correo con la contraseña actual
        if (usuario) {
            // Enviamos un correo atravez de la API emailjs
            emailjs.send(
                'inventarioweb', // reemplazamos con el ID de servicio de emailjs
                'recuperarcontrasena', // reemplazamos con tu ID de plantilla de emailjs
                { message: `Tu contraseña es ${usuario.Contrasena}` },
                'YP0N5IAHFKH5K9Mi0' // reemplazamos con tu ID de usuario de emailjs
            )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
        } else {
            alert('Usuario no existe');
        }
    };

    // Renderizamos el formulario de recuperación de contraseña
    return (
        <div>
            <form onSubmit={recuperarContrasena}>
                Por favor ingrese su correo electrónico:
                <input type="email" value={correo} onChange={manejarCambio} required />
                <button type="submit">Recuperar contraseña</button>
            </form>
            {/*mostramos el componente de recuperar contraseña */}
            <button onClick={() => navegar('/login')}>Volver</button>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default RecuperarContrasena;
