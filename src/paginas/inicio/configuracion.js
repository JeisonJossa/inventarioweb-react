import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../../contextoAutenticacion";

// Componente principal de la página de configuración
function Configuracion() {
    const navegar = useNavigate();
    const auth = useAuth();

    // Verificar si el usuario está autenticado, si no redirigir a la página de inicio de sesión
    useEffect(() => {
        if (!auth.estaAutenticado) {
            // Redirigimos al usuario a la página de inicio de sesión
            navegar('/');
            // Recargar la página después de 1 segundo
            setTimeout(() => window.location.reload(), 1000);
        }
    }, [auth.estaAutenticado, navegar]);
    return (
        <div>
            <h1>Configuración</h1>

            {/* Botón para configurar alertas de stock */}
            <Link to="/configuracion/alertasstock">
                <button>Configurar alertas de stock mínimo</button>
            </Link>

            {/* Botón para editar el perfil */}
            <Link to="/configuracion/editarperfil">
                <button>Editar perfil</button>
            </Link>
        </div>
    );
}

export default Configuracion;
