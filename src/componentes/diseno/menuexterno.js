// menuexterno.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../estilos/diseno.css';

const MenuExterno = () => {
    return (
        <nav className="menu-externo">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="menu-activo" exact>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName="menu-activo">Iniciar Sesión</NavLink>
                </li>
                <li>
                    <NavLink to="/registro" activeClassName="menu-activo">Registrarse</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MenuExterno;
