// menuprincipal.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import CerrarSesion from '../autenticacion/cerrarsesion';
import '../../estilos/diseno.css';

const Menuprincipal = () => {
    return (
        <Nav className="menu-externo">
            <ul>
                <li>
                    <Nav.Link as={NavLink} to="/inicio" activeClassName="menu-activo" exact>Inicio</Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to="/productos" activeClassName="menu-activo">Productos</Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to="/inventario" activeClassName="menu-activo">Inventario</Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to="/informes" activeClassName="menu-activo">Informes</Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to="/configuracion" activeClassName="menu-activo">Configuración</Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to="/usuarios" activeClassName="menu-activo">Usuarios</Nav.Link>
                </li>
                <li>
                    <CerrarSesion />
                </li>
            </ul>
        </Nav>
    );
}

export default Menuprincipal;
