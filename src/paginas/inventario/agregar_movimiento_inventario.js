// Importamos las bibliotecas necesarias
import React, { useState, useEffect } from 'react'; // React y hooks
import { useNavigate } from 'react-router-dom'; // Navegación de la aplicación
import { obtenerArticulos, actualizarArticulo } from '../../api/articulos'; // API para interactuar con los artículos
import {crearMovimiento,eliminarMovimiento} from '../../api/movimientos'; // API para crear movimientos

// Definimos el componente AgregarMovimientoInventario
function AgregarMovimientoInventario() {
    // Creación del hook para navegar a otras páginas
    const navegar = useNavigate();

    // Creación de los estados del componente
    const [articulos, setArticulos] = useState([]); // Estado para guardar los artículos
    const [movimiento, setMovimiento] = useState({ // Estado para guardar los datos del movimiento
        idmovimiento : 0,
        idarticulo: 0,
        nombrearticulo:'',
        cantidad: 0,
        tipo: 'Entrada',
        fecha: new Date().toISOString().split('T')[0]
    });

    // Hook que se ejecuta cuando el componente se monta
    useEffect(() => {
        const obtenerDatos = async () => { // Función asincrónica para obtener los datos de los artículos
            const datos = await obtenerArticulos(); // Llamada a la API para obtener los artículos
            setArticulos(datos); // Actualización del estado de los artículos
        };
        obtenerDatos(); // Ejecución de la función para obtener los datos
    }, []);

    // Función para manejar el cambio de artículo seleccionado
    const manejarCambioArticulo = (e) => {
        const articuloSeleccionado = articulos.find(a => parseInt(a.idarticulo) === parseInt(e.target.value));
        setMovimiento({
            ...movimiento,
            idarticulo: parseInt(articuloSeleccionado.idarticulo),
            nombrearticulo: articuloSeleccionado.nombrearticulo,
        });
    };

    // Función para manejar los cambios en los campos del formulario
    const manejarCambio = (e) => {
        setMovimiento({
            ...movimiento,
            [e.target.name]: e.target.value
        });
    };

    // Función para manejar el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        const articulo = articulos.find(a => parseInt(a.idarticulo) === parseInt(movimiento.idarticulo)); // Busca el artículo seleccionado

        // Si el movimiento es de entrada, incrementa la cantidad del artículo
        if (movimiento.tipo === 'Entrada') {
            articulo.CantidadStock += parseInt(movimiento.cantidad);
        }
        // Si el movimiento es de salida, verifica si hay suficiente cantidad en el inventario y si es así, decrementa la cantidad
        else if (movimiento.tipo === 'Salida') {
            if (parseInt(articulo.CantidadStock) < parseInt(movimiento.cantidad)) {
                alert(`No hay suficiente cantidad en el inventario para este movimiento, Cantidad del articulo: ${articulo.CantidadStock}.`); // Mensaje de error si no hay suficiente cantidad
                return;
            }
            articulo.CantidadStock -= parseInt(movimiento.cantidad);
        }

        // Convertimos los campos relevantes a números enteros
        articulo.PrecioArticulo = parseInt(articulo.PrecioArticulo);
        articulo.CantidadStock = parseInt(articulo.CantidadStock);
        articulo.EstadoArticulo = parseInt(articulo.EstadoArticulo);

        movimiento.idmovimiento = parseInt(movimiento.idmovimiento);
        movimiento.idarticulo = parseInt(movimiento.idarticulo);
        movimiento.cantidad = parseInt(movimiento.cantidad);

        const respuesta = await crearMovimiento(movimiento); // Crea el movimiento

        // Si la respuesta de crear movimiento es exitosa, intenta actualizar el artículo
        if (respuesta) {
            const actualizacionExitosa = await actualizarArticulo(articulo); // Intenta actualizar el artículo en la base de datos

            // Si la actualización del artículo es exitosa, muestra un mensaje de éxito y navega a la página de inventario
            if (actualizacionExitosa) {
                alert('Movimiento de inventario agregado correctamente e inventario actualizado'); // Muestra un mensaje de éxito
                navegar('/inventario'); // Navega a la página de inventario
            } else {
                // Si la actualización del artículo no es exitosa, borra el movimiento creado y muestra un mensaje de error
                await eliminarMovimiento(parseInt(respuesta.idmovimiento));
                alert('Error al actualizar el artículo, el movimiento de inventario no se ha agregado');
            }
        } else {
            // Si la respuesta de crear movimiento no es exitosa, muestra un mensaje de error
            alert('Error al agregar movimiento de inventario');
        }

    };

    // Renderiza el formulario
    return (
        <div>
        <form onSubmit={manejarEnvio}>
            <h1>Agregar Movimiento de Inventario</h1>
            <label>
                Artículo:
                <select name="idarticulo" onChange={manejarCambioArticulo} required>
                    <option value="">-- Seleccione --</option>
                    {articulos.map(articulo => (
                        // Itera sobre los artículos y crea una opción para cada uno
                        <option key={articulo.idarticulo} value={articulo.idarticulo}>{articulo.nombrearticulo}</option>
                    ))}
                </select>
            </label>
            <label>
                Cantidad:
                <input type="number" name="cantidad" onChange={manejarCambio} required />
            </label>
            <label>
                Tipo:
                <select name="tipo" onChange={manejarCambio} required>
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                </select>
            </label>
            <button type="submit">Agregar Movimiento</button>

        </form>

            <button onClick={() => navegar('/inventario')}>Cancelar</button>
       </div>


    );
}

// Exporta el componente
export default AgregarMovimientoInventario;

