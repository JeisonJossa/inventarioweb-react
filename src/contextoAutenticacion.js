// Importamos los módulos necesarios
import React, { createContext, useState, useContext } from 'react';

// Creamos el Contexto de Autenticación
export const ContextoAutenticacion = createContext();

// Creamos un Hook personalizado para permitir el acceso fácil al contexto de autenticación
export function useAuth() {
    return useContext(ContextoAutenticacion);
}

// Creamos el Proveedor de Autenticación
// Este componente se encargará de proveer el estado de autenticación a todos los componentes de la aplicación
//children se utiliza para que cualquier cosa que se coloque dentro del componente ProveedorAutenticacion
export const ProveedorAutenticacion = ({ children }) => {
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    const [usuarioLogueado, setUsuarioLogueado] = useState(null); // Modificado aquí

    const establecerAutenticacion = (estado, usuario) => { // Modificada
        setEstaAutenticado(estado);
        setUsuarioLogueado(usuario); // Modificado aquí
    }

    const value = { estaAutenticado, establecerAutenticacion, usuarioLogueado }; // Modificado aquí

    return (
        <ContextoAutenticacion.Provider value={value}>
            {children}
        </ContextoAutenticacion.Provider>
    );
};
