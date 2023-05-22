// Importamos las librerías necesarias
import React, { useState } from 'react';
import { crearUsuario } from '../../api/usuarios';
import emailjs from 'emailjs-com';
import {useNavigate} from "react-router-dom";

// Función principal del componente
const FormularioRegistroUsuario = () => {
    // Definimos el estado inicial del componente con useState
    const [usuario, setUsuario] = useState({
        IdUsuario: 0,
        NombreUsuario: '',
        CorreoElectronico: '',
        Contrasena: '',
        ConfirmarContrasena: '',
        EsAdmin: 0
    });

    // Esta función maneja el cambio en los campos del formulario y actualiza el estado
    const manejarCambio = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    // Utilizamos useNavigate para redireccionar al usuario después del inicio de sesión
    let navegar = useNavigate();

    // Esta función se ejecuta cuando se envía el formulario
    const registrarUsuario = async (e) => {
        // Prevenimos el comportamiento por defecto del formulario
        e.preventDefault();

        // Verificamos que las contraseñas sean iguales
        if (usuario.Contrasena !== usuario.ConfirmarContrasena) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Aquí hacemos la petición a la API para crear el usuario
        const resultado = await crearUsuario({
            IdUsuario: usuario.IdUsuario,
            NombreUsuario: usuario.NombreUsuario,
            CorreoElectronico: usuario.CorreoElectronico,
            Contrasena: usuario.Contrasena,
            EsAdmin: usuario.EsAdmin
        });

        if (resultado) {
            alert('Usuario creado exitosamente');

            // Enviamos un correo atravez de la API emailjs
            emailjs.send(
                'inventarioweb', // reemplazamos con el ID de servicio de emailjs
                'recuperarcontrasena', // reemplazamos con tu ID de plantilla de emailjs
                { message: ` En hora buena!! <br/> Bienvenido a inventarioweb:<br/> Nombre de Usuario:${usuario.NombreUsuario}<br/>
                 Contrasena: ${usuario.Contrasena}<br/> Gracias por Registrarte!!` },
                'YP0N5IAHFKH5K9Mi0' // reemplazamos con tu ID de usuario de emailjs
            )
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (err) => {
                    console.log('FAILED...', err);
                });

            //Reiniciamos los datos del usuario
            setUsuario({
                IdUsuario: 0,
                NombreUsuario: '',
                CorreoElectronico: '',
                Contrasena: '',
                ConfirmarContrasena: '',
                EsAdmin: 0
            });

            //Redireccionamos al componente Login
            navegar('/login')
        } else {
            alert('Hubo un error al crear el usuario.');
            console.log(e)
        }
    };

    // Renderizamos el formulario de registro
    return (
        <div>
            <form onSubmit={registrarUsuario}>
                Nombre de usuario:
                <input type="text" name="NombreUsuario" value={usuario.NombreUsuario} onChange={manejarCambio} required />
                <br/>
                Correo electronico:
                <input type="email" name="CorreoElectronico" value={usuario.CorreoElectronico} onChange={manejarCambio} required />
                <br/>
                Contraseña:
                <input type="password" name="Contrasena" value={usuario.Contrasena} onChange={manejarCambio} required />
                <br/>
                Confirmar Contraseña:
                <input type="password" name="ConfirmarContrasena" value={usuario.ConfirmarContrasena} onChange={manejarCambio} required />
                <br/>
                <button type="submit"  >Registrar</button>

            </form>
        </div>
    );
};
//
// Exportamos el componente para que pueda ser usado en otros archivos
export default FormularioRegistroUsuario;
