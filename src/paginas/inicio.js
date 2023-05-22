import React, {useEffect} from 'react';
import '../estilos/inicio.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contextoAutenticacion";
function Inicio() {

    return (
        <div>
            <h1>Software para administrar el inventario de una bicicletería</h1>
            <p>El objetivo de este proyecto es simplificar la administración de una bodega de bicicletas, <br/>
                a través de la creación de un sitio web que permita gestionar el inventario de manera eficiente. <br/>
                lo que permitirá una gestión más efectiva y rentable. <br/>
                Con este proyecto, se busca ofrecer una solución práctica y efectiva para la gestión de una bodega de bicicletas, <br/>
                mejorando la productividad y eficiencia en el negocio.</p>
            <p>Nuestro software cuenta con las siguientes funcionalidades:</p>
            <ul>

                <li>Actualizacion de precios y cantidades</li>
                <li>Alertas de stock mínimo</li>
                <li>Generación de informes</li>
                <li>Registro de productos</li>
                <li>Seguimiento detallado de las existencias</li>
            </ul>
        </div>
    );
}

export default Inicio;
