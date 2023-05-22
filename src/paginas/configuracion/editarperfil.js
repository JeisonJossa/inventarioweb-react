import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {actualizarUsuario, obtenerUsuario} from '../../api/usuarios';
import {useAuth} from "../../contextoAutenticacion";

const EditarPerfil = () => {
    const navegar = useNavigate();
    const { usuarioLogueado } = useAuth();
    const [usuario, setUsuario] = useState({
        IdUsuario:0,
        NombreUsuario: "",
        CorreoElectronico: "",
        Contrasena: "",
        EsAdmin:0
    });

    useEffect(() => {
        const fetchUsuario = async () => {
            const usuario = await obtenerUsuario(usuarioLogueado.correo);
            setUsuario(usuario);
        };
        fetchUsuario();
    }, [usuarioLogueado.correo]);

    const manejarCambio = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const actualizarUsuarioExistente = async (e) => {
        e.preventDefault();

        const actualizado = await actualizarUsuario(usuario,usuarioLogueado.correo);

        if (actualizado) {

            alert('Usuario actualizado exitosamente.');
            navegar('/configuracion');

        } else {
            alert('Hubo un error al actualizar el usuario');
            navegar('/configuracion');
        }
    };

    return (
        <div>
            <form onSubmit={actualizarUsuarioExistente}>
                <label>
                    Nombre del usuario:
                    <input type="text" name="NombreUsuario" value={usuario.NombreUsuario} onChange={manejarCambio} required />
                </label>
                <br/>
                <label>
                    Correo Electrónico:
                    <input type="email" name="CorreoElectronico" value={usuario.CorreoElectronico} onChange={manejarCambio} required />
                </label>
                <br/>
                <label>
                    Contraseña:
                    <input type="password" name="Contrasena" value={usuario.Contrasena} onChange={manejarCambio} required />
                </label>
                <br/>
                <button type="submit">Actualizar Perfil</button>
            </form>
            <button onClick={() => navegar('/configuracion')}>Cancelar</button>
        </div>
    );
};

export default EditarPerfil;
