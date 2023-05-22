// Importación de módulos y componentes necesarios
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../contextoAutenticacion";

// Definición del componente Dashboard
function Dashboard() {
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
        <div className="dashboard">
            <div className="dashboard-card">
                <h2>Información General de la Bodega</h2>
                <p>Actualmente hay 75 productos en stock y 10 productos con stock mínimo.</p>
                <Link to="/productos" className="btn btn-primary">Ver productos</Link>
            </div>
            <div className="dashboard-card">
                <h2>Productos Destacados</h2>
                <p>A continuación se presentan los productos más vendidos en el último mes:</p>
                <ul>
                    <li>Bicicleta de montaña marca Trek</li>
                    <li>Bicicleta para niños marca Schwinn</li>
                    <li>Casco para ciclismo marca Giro</li>
                </ul>
                <Link to="/productos" className="btn btn-primary">Ver todos los productos</Link>
            </div>
        </div>
    );
}

export default Dashboard;
