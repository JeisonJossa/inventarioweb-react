// Importamos las dependencias necesarias
import React, { useEffect, useMemo, useState } from 'react'; // Importamos React, useEffect, useMemo y useState de 'react'.
import { useTable } from 'react-table'; // Importamos useTable de 'react-table'.
import jsPDF from 'jspdf'; // Importamos jsPDF de 'jspdf'.
import 'jspdf-autotable'; // Importamos 'jspdf-autotable'.
import {obtenerArticulos} from "../../api/articulos"; // Importamos la función obtenerArticulos de nuestra API personalizada.

// Definimos el componente ExportarDatosInventario
const ExportarDatosInventario = () => {
    // Definimos el estado de los artículos
    const [articulos, setArticulos] = useState([]);

    // Usamos useEffect para obtener los datos del inventario desde la API cuando el componente se monta
    useEffect(() => {
        const obtenerArticulosDelInventario = async () => {
            const articulosObtenidos = await obtenerArticulos(); // Obtenemos los artículos de la API
            setArticulos(articulosObtenidos); // Establecemos el estado de los artículos con los obtenidos de la API
            console.log(articulosObtenidos); // Imprimimos los artículos en la consola
        };

        obtenerArticulosDelInventario(); // Llamamos a la función obtenerArticulosDelInventario
    }, []);

    // Definimos las columnas de la tabla
    const columnas = useMemo(
        () => [
            {
                Header: 'Nombre del artículo',
                accessor: 'nombrearticulo',
            },
            {
                Header: 'Cantidad',
                accessor: 'CantidadStock',
            },
            {
                Header: 'Precio Unitario',
                accessor: 'PrecioArticulo',
            },
            {
                Header: 'Total Neto',
                accessor: articulo => articulo.CantidadStock * articulo.PrecioArticulo,
                id: 'valorTotal' // Es necesario proporcionar un 'id' cuando accessor es una función
            },
        ],
        []
    );

    // Usamos useTable para preparar los datos y las columnas para la tabla
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns: columnas, data: articulos });

    // Definimos la función para exportar la tabla en formato PDF
    const exportarPDF = () => {
        const doc = new jsPDF(); // Creamos un nuevo documento PDF
        doc.autoTable({ html: '#miTabla' }); // Usamos autoTable para agregar la tabla al documento PDF
        doc.save('inventario.pdf'); // Guardamos el documento PDF
    };

    // Renderizamos el botón para exportar a PDF y la tabla
    return (
        <div>
            <button onClick={exportarPDF}>Exportar a PDF</button>
            {/* Crea una tabla. getTableProps() es una función de react-table que proporciona propiedades necesarias para la tabla. */}
            <table {...getTableProps()} id="miTabla">
                {/* Define la sección del encabezado de la tabla */}
                <thead>
                {/* Mapea a través de todos los grupos de encabezados proporcionados por react-table */}
                {/* Crea una fila para cada grupo de encabezados. getHeaderGroupProps() proporciona las propiedades necesarias para el grupo de encabezados */}
                {/* headers.map() Mapea a través de todos los encabezados en el grupo de encabezados actual */}
                {/* th Crea una celda de encabezado para cada encabezado. getHeaderProps() proporciona las propiedades necesarias para el encabezado. */}
                {/* render('Header') devuelve el contenido de la celda de encabezado  */}
                {headerGroups.map(grupoEncabezado => (<tr {...grupoEncabezado.getHeaderGroupProps()}>{grupoEncabezado.headers.map(columna => (
                                                                <th {...columna.getHeaderProps()}>{columna.render('Header')}</th>
                                                            ))}
                                                      </tr>
                                                      )
                )}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(fila => {
                    prepareRow(fila);
                    return (
                        <tr {...fila.getRowProps()}>
                            {fila.cells.map(celda => (
                                <td {...celda.getCellProps()}>{celda.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default ExportarDatosInventario;
