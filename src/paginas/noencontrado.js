import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contextoAutenticacion";

function NoEncontrado() {

    return (
        <div>
            <h1>404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
        </div>
    );
}

export default NoEncontrado;
