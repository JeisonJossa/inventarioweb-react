// Importamos las bibliotecas necesarias
import React, { useState, useEffect } from 'react'; // React y hooks
import { useNavigate, useParams } from 'react-router-dom'; // Navegación de la aplicación
import { obtenerArticulos, actualizarArticulo } from '../../api/articulos'; // API para interactuar con los artículos
import { obtenerMovimiento, actualizarMovimiento, eliminarMovimiento } from '../../api/movimientos'; // API para interactuar con los movimientos

// Definimos el componente EditarMovimiento
function EditarMovimiento() {
    // Creación del hook para navegar a otras páginas
    const navegar = useNavigate();
    const {id} = useParams(); // Obtiene el id del movimiento de la URL

    // Creación de los estados del componente
    const [articulos, setArticulos] = useState([]); // Estado para guardar los artículos
    const [articuloOriginal, setArticuloOriginal] = useState(null); // Estado para guardar el artículo original
    const [movimiento, setMovimiento] = useState(null); // Estado para guardar los datos del movimiento
    const [movimientoOriginal, setMovimientoOriginal] = useState(null);// Estado para guardar los datos del movimiento original

    // Hook que se ejecuta cuando el componente se monta
    useEffect(() => {
        const obtenerDatos = async () => { // Función asincrónica para obtener los datos de los artículos y el movimiento
            const datosArticulos = await obtenerArticulos(); // Llamada a la API para obtener los artículos
            setArticulos(datosArticulos); // Actualización del estado de los artículos

            const datosMovimiento = await obtenerMovimiento(id); // Llamada a la API para obtener el movimiento
            setMovimiento(datosMovimiento); // Actualización del estado del movimiento
            setMovimientoOriginal(datosMovimiento) // Almacena el movimiento original

            // Encuentra el artículo original
            const articuloOriginal = datosArticulos.find(a => a.idarticulo === datosMovimiento.idarticulo);
            setArticuloOriginal(articuloOriginal);
        };
        obtenerDatos(); // Ejecución de la función para obtener los datos
    }, [id]);

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


        movimiento.idmovimiento = parseInt(movimiento.idmovimiento);
        movimiento.idarticulo = parseInt(movimiento.idarticulo);
        movimiento.cantidad = parseInt(movimiento.cantidad);

        movimientoOriginal.idmovimiento = parseInt(movimientoOriginal.idmovimiento);
        movimientoOriginal.idarticulo = parseInt(movimientoOriginal.idarticulo);
        movimientoOriginal.cantidad = parseInt(movimientoOriginal.cantidad);

        // Busca el artículo seleccionado
        const articuloSeleccionado = articulos.find(a => a.idarticulo === movimiento.idarticulo);


        // Verifica si la cantidad y el tipo de movimiento son los mismos que los del movimiento original
        if (movimiento.cantidad === movimientoOriginal.cantidad &&
            movimiento.tipo === movimientoOriginal.tipo &&
            movimiento.idarticulo === movimientoOriginal.idarticulo) {
            alert('El movimiento no tuvo cambios.');
            return
        } else {


            // Primero deshace el movimiento original en el artículo original
            if (movimientoOriginal.tipo === 'Entrada') {
                articuloOriginal.CantidadStock -= parseInt(movimientoOriginal.cantidad);
            } else if (movimientoOriginal.tipo === 'Salida') {
                articuloOriginal.CantidadStock += parseInt(movimientoOriginal.cantidad);
            }
            console.log("este es el mov original")
            console.log(movimientoOriginal)
            console.log(movimiento)
            // Primero deshace el movimiento original en el artículo original Si el artículo ha cambiado
            if (movimiento.idarticulo !== movimientoOriginal.idarticulo) {

                // Luego aplica el nuevo movimiento en el artículo seleccionado
                if (movimiento.tipo === 'Entrada') {
                    articuloSeleccionado.CantidadStock += parseInt(movimiento.cantidad);
                } else if (movimiento.tipo === 'Salida') {
                    if (articuloSeleccionado.CantidadStock < movimiento.cantidad) {
                        alert(`No hay suficiente cantidad en el inventario para este movimiento, Cantidad del articulo: ${articuloSeleccionado.CantidadStock}.`);

                        // Reaplica el movimiento original en el artículo original para revertir el cambio de stock
                        if (movimientoOriginal.tipo === 'Entrada') {
                            articuloOriginal.CantidadStock += parseInt(movimientoOriginal.cantidad);
                        } else if (movimientoOriginal.tipo === 'Salida') {
                            articuloOriginal.CantidadStock -= parseInt(movimientoOriginal.cantidad);
                        }
                        return;
                    }
                    articuloSeleccionado.CantidadStock -= parseInt(movimiento.cantidad);
                }
            } else {
                // Si el artículo no ha cambiado, actualizamos el movimiento en el articulo original
                if (movimiento.tipo === 'Entrada') {
                    articuloOriginal.CantidadStock += parseInt(movimiento.cantidad);
                } else if (movimiento.tipo === 'Salida') {
                    if (articuloOriginal.CantidadStock < movimiento.cantidad) {
                        alert(`No hay suficiente cantidad en el inventario para este movimiento, Cantidad del articulo: ${articuloOriginal.CantidadStock}.`);

                        // Reaplica el movimiento original en el artículo original para revertir el cambio de stock
                        if (movimientoOriginal.tipo === 'Entrada') {
                            articuloOriginal.CantidadStock += parseInt(movimientoOriginal.cantidad);
                        } else if (movimientoOriginal.tipo === 'Salida') {
                            articuloOriginal.CantidadStock -= parseInt(movimientoOriginal.cantidad);
                        }
                        return;
                    }
                    articuloOriginal.CantidadStock -= parseInt(movimiento.cantidad);
                }


            }


            // Convertimos los campos relevantes a números enteros
            articuloSeleccionado.PrecioArticulo = parseInt(articuloSeleccionado.PrecioArticulo);
            articuloSeleccionado.CantidadStock = parseInt(articuloSeleccionado.CantidadStock);
            articuloSeleccionado.EstadoArticulo = parseInt(articuloSeleccionado.EstadoArticulo);

            articuloOriginal.PrecioArticulo = parseInt(articuloSeleccionado.PrecioArticulo);
            articuloOriginal.CantidadStock = parseInt(articuloSeleccionado.CantidadStock);
            articuloOriginal.EstadoArticulo = parseInt(articuloSeleccionado.EstadoArticulo);

            movimiento.idmovimiento = parseInt(movimiento.idmovimiento);
            movimiento.idarticulo = parseInt(movimiento.idarticulo);
            movimiento.cantidad = parseInt(movimiento.cantidad);

            // Actualiza el movimiento
            const respuesta = await actualizarMovimiento(movimiento);

            // Si la respuesta de actualizar movimiento es exitosa, intenta actualizar el artículo
            if (respuesta) {


                // Si el artículo ha cambiado, intentamos actualizar el artículo original
                if (movimiento.idarticulo !== movimientoOriginal.idarticulo) {
                    // Intenta actualizar el nuevo artículo en la base de datos
                    const actualizacionExitosaArticulo = await actualizarArticulo(articuloSeleccionado);
                    const actualizacionExitosaArticuloOriginal = await actualizarArticulo(articuloOriginal);
                    if (actualizacionExitosaArticulo && actualizacionExitosaArticuloOriginal) {
                        alert('Movimiento de inventario actualizado correctamente e inventario actualizado');
                        navegar('/inventario');
                    } else {
                        // Si la actualización de alguno de los artículos no es exitosa, muestra un mensaje de error
                        alert('Error al actualizar el artículo, el movimiento de inventario no se ha actualizado');
                        return
                    }
                } else {
                    //Si el articulo no ha cambiado procedemos a realizar la actualizacion
                    const actualizacionExitosaArticuloOriginal = await actualizarArticulo(articuloOriginal);
                    // Si la actualización de ambos artículos es exitosa, muestra un mensaje de éxito y navega a la página de inventario
                    if (actualizacionExitosaArticuloOriginal) {
                        alert('Movimiento de inventario actualizado correctamente e inventario actualizado'); // Muestra un mensaje de éxito
                        navegar('/inventario'); // Navega a la página de inventario
                    } else {
                        // Si la actualización de alguno de los artículos no es exitosa, muestra un mensaje de error
                        alert('Error al actualizar el artículo, el movimiento de inventario no se ha actualizado');
                        return
                    }
                }


            } else {
                // Si la respuesta de actualizar movimiento no es exitosa, muestra un mensaje de error
                alert('Error al actualizar movimiento de inventario');
                return
            }

        }
    }

    // Si el movimiento o los artículos aún no se han cargado, muestra un mensaje de carga
    if (!movimiento || !articulos.length) {
        return <p>Cargando...</p>;
    }

    // Renderiza el formulario
    return (
        <div>
            <form onSubmit={manejarEnvio}>
                <h1>Editar Movimiento de Inventario</h1>
                <label>
                    Artículo:
                    <select name="idarticulo" onChange={manejarCambio} required value={movimiento.idarticulo}>
                        {articulos.map(articulo => (
                            // Itera sobre los artículos y crea una opción para cada uno
                            <option key={articulo.idarticulo}
                                    value={articulo.idarticulo}>{articulo.nombrearticulo}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Cantidad:
                    <input type="number" name="cantidad" onChange={manejarCambio} required
                           value={movimiento.cantidad}/>
                </label>
                <label>
                    Tipo:
                    <select name="tipo" onChange={manejarCambio} required value={movimiento.tipo}>
                        <option value="Entrada">Entrada</option>
                        <option value="Salida">Salida</option>
                    </select>
                </label>
                <button type="submit">Actualizar Movimiento</button>
            </form>
            <button onClick={() => navegar('/inventario')}>Cancelar</button>
        </div>
    );

}

// Exporta el componente
export default EditarMovimiento;

