import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextoAutenticacion';
import { obtenerAlertas, eliminarAlerta } from '../../api/alertas';

function AlertasStockMinimo() {
    const navegar = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (!auth.estaAutenticado) {
            navegar('/');
            setTimeout(() => window.location.reload(), 1000);
        } else {
            obtenerAlertas().then((data) => {
                setAlertas(data);
            });
        }
    }, [auth.estaAutenticado, navegar]);

    const [alertas, setAlertas] = useState([]);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);

    const listarAlertas = async () => {
        const alertasObtenidas = await obtenerAlertas();
        if (alertasObtenidas) {
            setAlertas(alertasObtenidas);
        }
    }

    const eliminarAlertaSeleccionada = async () => {
        if (alertaSeleccionada) {
            if (window.confirm(`¿Estás seguro que deseas eliminar la alerta con id: ${alertaSeleccionada.idalertastock} ?`)) {
                const resultado = await eliminarAlerta(alertaSeleccionada.idalertastock);
                if (resultado) {
                    setAlertas(alertas.filter(a => a.idalertastock !== alertaSeleccionada.idalertastock));
                    setAlertaSeleccionada(null);
                    alert("Alerta eliminada correctamente");
                    listarAlertas()
                } else {
                    alert("No se pudo eliminar la alerta");
                    listarAlertas()
                }
            }
        } else {
            alert("No tienes seleccionada ninguna alerta.");
        }
    };

    return (
        <div>
            <h1>Alertas de Stock Mínimo</h1>

            <button onClick={() => navegar('agregaralerta')}>Agregar Alerta</button>
            <button
                onClick={() => {
                    if (alertaSeleccionada) {
                        navegar(`/alertas/editaralerta/${alertaSeleccionada.idalertastock}`);
                    } else {
                        alert('Por favor, selecciona una alerta para editar');
                    }
                }}
            >
                Editar Alerta
            </button>

            <button onClick={eliminarAlertaSeleccionada}>Eliminar Alerta</button>
            <button onClick={() => navegar('/configuracion')}>Cancelar</button>
            <table>
                <thead>
                <tr>
                    <th>ID de Alerta</th>
                    <th>Cantidad Mínima</th>
                    <th>ID de Artículo</th>
                </tr>
                </thead>
                <tbody>
                {alertas.map((alerta) => (
                    <tr key={alerta.idalertastock} onClick={() => setAlertaSeleccionada(alerta)}>
                        <td>{alerta.idalertastock}</td>
                        <td>{alerta.CantidadMinima}</td>
                        <td>{alerta.IdArticulo}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default AlertasStockMinimo;
