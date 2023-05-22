import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextoAutenticacion';  // Asegúrate de importar useAuth

const CerrarSesion = () => {
    const navegar = useNavigate();
    const auth = useAuth();  // Obtén la instancia de auth

    const manejarCierreSesion = () => {
        // Eliminamos el usuario del almacenamiento local
        localStorage.removeItem('usuario');

        // Borramos la información del usuario del contexto
        auth.establecerAutenticacion(false, null);

        // Redirigimos al usuario a la página de inicio de sesión
        navegar('/');

        // Recargar la página después de 1 segundo
        setTimeout(() => window.location.reload(), 500);
    };

    return (
        <button onClick={manejarCierreSesion}>
            Cerrar sesión
        </button>
    );
};

export default CerrarSesion;
