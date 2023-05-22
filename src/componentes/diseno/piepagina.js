// piepagina.js

import React from 'react';
import { Container } from 'react-bootstrap';
import '../../estilos/diseno.css';

const PiePagina = () => {
    const anioActual = new Date().getFullYear();

    return (
        <footer className="pie-pagina">
            <Container>
                <p >Inventario Web Jeison Jossa &copy; {anioActual}. Todos los derechos reservados.</p>
            </Container>
        </footer>
    );
}

export default PiePagina;
