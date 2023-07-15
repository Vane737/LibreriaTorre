
import { useEffect, useState, useRef } from "react";
import api from "../../../API/axios";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import { ListBookShopRows } from "../../../components/row/ListBookShopRows";


  
  export const ReadShopping = () => {
    const { id } = useParams();
    const head = ['LIBRO', 'ID', 'CANTIDAD', 'PRECIO UNITARIO', 'PRECIO TOTAL'];
    const [notaCompra, setNotaCompra] = useState({});
    const [loading, setLoading] = useState(true);
    const componentPDF = useRef();
    
    useEffect(() => {
        const fetchVenta = async () => {
        try {
            const response = await api.get(`/compra/${id}`);
            console.log(response.data.notaCompra);
            setNotaCompra(response.data.notaCompra);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        };
        fetchVenta();
    }, [id]);
     
    const generatePDF = useReactToPrint({
        content: () =>  componentPDF.current,
        documentTitle: "Nota de Venta",
    });

    if (loading) {
        return <div>Cargando nota de venta...</div>;
    }
    
    if (!notaCompra) {
        return <div>No se encontró el la nota de venta</div>;
    }

    return (
        <div className="w-full p-5 bg-white">
        <div className="mt-10">
            <p className="font-bold">NOTA DE COMPRA</p>
        </div>
        <div ref={ componentPDF } className="border-b border-solid border-gray-900 pb-12 bg-white drop-shadow-md">
            <div className="mt-5 p-5 h-screen">
                    <h1 className="py-6 text-2xl font-bold">LA TORRE</h1>
                    <p className="text-base font-bold leading-7 text-gray-900">{notaCompra.usuario.nombre}</p>
                    <p className="text-base font-bold leading-7 text-gray-900"> {notaCompra.fecha}, {notaCompra.hora}</p>
                    <p className="text-base font-bold leading-7 text-gray-900"> Proveedor: </p>
                    <p className="text-base font-bold leading-7 text-gray-900"> Nombre: {notaCompra.proveedore.nombre}</p>
                    <p className="text-base font-bold leading-7 text-gray-900">Teléfono: {notaCompra.proveedore.telefono}</p>
                    <p className="pb-12 text-base font-bold leading-7 text-gray-900">Correo: {notaCompra.proveedore.correo}</p>
                    {/* <p className="py-3"><strong>Dirección:</strong> {notaCompra.direccion}</p>  */}
                <div>
                    <ListBookShopRows head={head} body={notaCompra.Libros}/>
                    <div className="mt-5">
                        <p className="font-bold">SUB_TOTAL: {notaCompra.total}</p>
                        <p className="font-bold">TOTAL: {notaCompra.total}</p>
                    </div>
                </div>
                <button className="mt-12 bg-custom-grey rounded-md p-1 px-8 font-bold" onClick={ generatePDF }>
                    IMPRIMIR
                </button>
            </div>
        </div>
        </div>
    )
  }
  