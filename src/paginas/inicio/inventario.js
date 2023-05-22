// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextoAutenticacion';
import { obtenerMovimientos, eliminarMovimiento } from '../../api/movimientos';

// Componente que muestra la página de Inventario
function Inventario() {
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
            // Si el usuario está autenticado, obtenemos la lista de Movimientos
            obtenerMovimientos().then((data) => {
                setMovimientos(data);
            });
        }
    }, [auth.estaAutenticado, navegar]);

    // Definimos el estado de los Movimientos y del Movimiento seleccionado
    const [movimientos, setMovimientos] = useState([]);
    const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);

    // Funcion para listar los Movimientos
    const listarMovimientos = async () => {
        const movimientosObtenidos = await obtenerMovimientos();
        if (movimientosObtenidos) {
            setMovimientos(movimientosObtenidos);
        }
    }

    // Función para eliminar el Movimiento seleccionado
    const eliminarMovimientoSeleccionado = async () => {
        if (movimientoSeleccionado) {
            if (window.confirm(`¿Estás seguro que deseas eliminar el movimiento: ${movimientoSeleccionado.idmovimiento} ?`)) {
                const resultado = await eliminarMovimiento(movimientoSeleccionado.idmovimiento);
                if (resultado) {
                    setMovimientos(movimientos.filter(m => m.id !== movimientoSeleccionado.idmovimiento));
                    setMovimientoSeleccionado(null);
                    alert("Movimiento eliminado correctamente");
                    listarMovimientos()
                } else {
                    alert("No se pudo eliminar el movimiento");
                    listarMovimientos()
                }
            }
        } else {
            alert("No tienes seleccionado ningun movimiento.");
        }

    };

    return (
        <div>
            <h1>Inventario</h1>

            <button onClick={() => navegar('agregarmovimiento')}>Agregar movimiento</button>
            <button
                onClick={() => {
                    if (movimientoSeleccionado) {
                        navegar(`/inventario/editarmovimiento/${movimientoSeleccionado.idmovimiento}`);
                    } else {
                        alert('Por favor, selecciona un movimiento para editar');
                    }
                }}
            >
                Editar movimiento
            </button>
            <button onClick={eliminarMovimientoSeleccionado}>Eliminar movimiento</button>
            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <table>
                    <thead>
                    <tr>
                        <th># Movimiento</th>
                        <th>Nombre Articulo</th>
                        <th>Cantidad</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movimientos.map((movimiento) => (
                        <tr key={movimiento.idmovimiento} onClick={() => setMovimientoSeleccionado(movimiento)}>
                            <td>{movimiento.idmovimiento}</td>
                            <td>{movimiento.nombrearticulo}</td>
                            <td>{movimiento.cantidad}</td>
                            <td>{movimiento.tipo}</td>
                            <td>{movimiento.fecha}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Inventario;

