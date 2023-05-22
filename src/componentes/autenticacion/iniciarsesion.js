// Importamos las librerías necesarias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../estilos/formularios.css"
// Importamos la función obtenerUsuario de nuestro módulo API
import { obtenerUsuario } from '../../api/usuarios';



// Función principal del componente
const IniciarSesion = () => {
    // Definimos el estado inicial del componente con useState
    const [credenciales, setCredenciales] = useState({
        correo: '',
        contrasena: ''
    });

    // Utilizamos useNavigate para redireccionar al usuario después del inicio de sesión
    let navegar = useNavigate();

    // Esta función maneja el cambio en los campos del formulario y actualiza el estado
    const manejarCambio = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    // Esta función se ejecuta cuando se envía el formulario
    const iniciarSesion = async (e) => {
        // Prevenimos el comportamiento por defecto del formulario
        e.preventDefault();

        // Aquí hacemos la petición a la API para obtener los datos del usuario
        const usuario = await obtenerUsuario(credenciales.correo);

        if (usuario && usuario.Contrasena === credenciales.contrasena) {
            // Almacena el valor Usuario "autenticado" en el navegador
            localStorage.setItem('usuario', JSON.stringify(credenciales));

            // Redirigimos al usuario a la página de inicio de sesión
            navegar('/inicio');
            // Recargar la página después de 1 segundo
            setTimeout(() => window.location.reload(), 500);

        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    // Renderizamos el formulario de inicio de sesión
    return (
        <div className="formulario">
            <form onSubmit={iniciarSesion}>
                <label>Correo electrónico:</label>
                <input type="email" name="correo" onChange={manejarCambio} required />
                <br/>
                <label>Contraseña:</label>
                <input type="password" name="contrasena" onChange={manejarCambio} required />
                <br/>
                <button type="submit">Iniciar sesión</button>
            </form>
            <button onClick={() => navegar('/recuperarcontrasena')}>Recuperar Contraseña</button>
        </div>
    );
};



// Exportamos el componente para que pueda ser usado en otros archivos
export default IniciarSesion;
