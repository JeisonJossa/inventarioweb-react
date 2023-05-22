import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contextoAutenticacion";

// Componente que renderiza la página de Informes
function Informes() {
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
        <div className="container">
            <h1>Informes</h1>
            <p>Seleccione una opción:</p>
            <button onClick={() => navegar('exportardatos')}>Exportar datos de inventario</button>

        </div>
    );
}

export default Informes;
