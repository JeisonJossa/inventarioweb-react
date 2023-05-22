// Importamos las librerías necesarias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearUsuario } from "../../api/usuarios";

// Función principal del componente
const AgregarUsuario = () => {

    // Definimos el estado inicial del componente con useState
    const [usuario, setUsuario] = useState({
        IdUsuario: 0,
        NombreUsuario: '',
        CorreoElectronico: '',
        Contrasena: '',
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
    const agregarUsuario = async (e) => {
        // Prevenimos el comportamiento por defecto del formulario
        e.preventDefault();

        // Aquí hacemos la petición a la API para crear el usuario
        const resultado = await crearUsuario(usuario);

        if (resultado) {
            alert('Usuario creado exitosamente');
            // Redirigimos al usuario a la página de inicio de sesión
            navegar('/usuarios');
        } else {
            alert('Hubo un error al crear el usuario');
        }
    };

    // Renderizamos el formulario de creación de usuario
    return (
        <div>
            <form onSubmit={agregarUsuario}>
                Nombre de usuario:
                <input type="text" name="NombreUsuario" onChange={manejarCambio} required />
                <br/>
                Correo electronico:
                <input type="email" name="CorreoElectronico" onChange={manejarCambio} required />
                <br/>
                Contraseña:
                <input type="password" name="Contrasena" onChange={manejarCambio} required />
                <br/>
                <button type="submit">Crear Usuario</button>
            </form>
            <button onClick={() => navegar('/usuarios')}>Cancelar</button>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default AgregarUsuario;
