// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextoAutenticacion';
import { obtenerUsuarios, eliminarUsuario } from '../../api/usuarios';

// Componente que muestra la página de Usuarios
function Usuarios() {
    // Usamos useNavigate para poder navegar a otras rutas
    const navegar = useNavigate();

    // Usamos useAuth para obtener el estado de autenticación del usuario
    const auth = useAuth();

    // Verificamos si el usuario está autenticado, si no, redirigimos a la página de inicio de sesión
    useEffect(() => {
        if (!auth.estaAutenticado) {
            // Redirigimos al usuario a la página de inicio de sesión
            navegar('/');
            // Recargamos la página después de 1 segundo
            setTimeout(() => window.location.reload(), 1000);
        } else {
            // Si el usuario está autenticado, obtenemos la lista de usuarios
            obtenerUsuarios().then((data) => {
                setUsuarios(data);
            });
        }
    }, [auth.estaAutenticado, navegar]);


    // Definimos el estado de los usuarios y del usuario seleccionado
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);


    // Funcion para listar los usuarios
    const listarUsuarios = async () => {
        const usuariosObtenidos = await obtenerUsuarios();
        if (usuariosObtenidos) {
            setUsuarios(usuariosObtenidos);
        }
    }

    // Función para eliminar el usuario seleccionado
    const eliminarUsuarioSeleccionado = async () => {
        if (usuarioSeleccionado) {
            // Mostramos una confirmación antes de eliminar
            if (window.confirm(`¿Estás seguro que deseas eliminar al usuario: ${usuarioSeleccionado.NombreUsuario}, correo: ${usuarioSeleccionado.CorreoElectronico} ?`)) {
                // Llamamos a la función eliminarUsuario con el correo electrónico del usuario seleccionado
                const resultado = await eliminarUsuario(usuarioSeleccionado.CorreoElectronico);
                if (resultado) {
                    // Si el usuario es eliminado correctamente, actualizamos la lista de usuarios
                    setUsuarios(usuarios.filter(u => u.CorreoElectronico !== usuarioSeleccionado.CorreoElectronico));
                    // Y reiniciamos el usuario seleccionado
                    setUsuarioSeleccionado(null);
                    alert("Usuario eliminado correctamente");
                    listarUsuarios()
                } else {
                    alert("No se pudo eliminar el usuario");
                    listarUsuarios()
                }
            }
        }else {
            alert("No tienes seleccionado ningun usuario.");
        }
    };


    // Renderizamos el contenido de la página
    return (
        <div>
            <h1>Usuarios</h1>

            <button onClick={() => navegar('agregarusuario')}>Agregar usuario</button>
            <button
                onClick={() => {
                    if (usuarioSeleccionado) {
                        navegar(`/usuarios/editarusuario/${usuarioSeleccionado.CorreoElectronico}`);
                    } else {
                        alert('Por favor, selecciona un usuario para editar');
                    }
                }}
            >
                Editar usuario
            </button>

            <button onClick={eliminarUsuarioSeleccionado}>Eliminar usuario</button>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Es Admin</th>
                </tr>
                </thead>
                <tbody>
                {/* Iteramos sobre la lista de usuarios para mostrar cada uno en la tabla */}
                {usuarios.map((usuario) => (
                    <tr key={usuario.CorreoElectronico} onClick={() => setUsuarioSeleccionado(usuario)}>
                        <td>{usuario.NombreUsuario}</td>
                        <td>{usuario.CorreoElectronico}</td>
                        <td>{usuario.EsAdmin ? 'Si' : 'No'}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

// Exportamos el componente para que pueda ser usado en otros archivos

export default Usuarios;
