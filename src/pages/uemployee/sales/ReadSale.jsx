
import { useEffect, useState, useRef } from "react";
import api from "../../../API/axios";
import { useParams } from "react-router";
import { ListBookSaleRows } from "../../../components/row/ListBookSaleRows";
import { useReactToPrint } from "react-to-print";


  
  export const ReadSaleEmployee = () => {
    const { id } = useParams();
    const head = ['Titulo', 'Id', 'Cantidad', 'Precio Unitario', 'Descuento', 'Precio Total'];
    const [notaVenta, setNotaVenta] = useState({});
    const [loading, setLoading] = useState(true);
    const componentPDF = useRef();
    
    useEffect(() => {
        const fetchVenta = async () => {
        try {
            const response = await api.get(`/venta/${id}`);
            console.log(response.data.notaVenta);
            setNotaVenta(response.data.notaVenta);
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
    
    if (!notaVenta) {
        return <div>No se encontró el la nota de venta</div>;
    }


    return (
        <div className="w-full p-5 bg-white">
        <div className="mt-10">
            <p className="font-bold">NOTA DE VENTA</p>
        </div>
        <div ref={ componentPDF } className="border-b border-solid border-gray-900 pb-12 bg-white drop-shadow-md">
            <div className="mt-5 p-5 h-screen">
                    <h1 className="py-6 text-2xl font-bold">LA TORRE</h1>
                    <p className="text-base font-bold leading-7 text-gray-900">{notaVenta.vendedor.nombre}</p>
                    <p className="text-base font-bold leading-7 text-gray-900"> {notaVenta.fecha}, {notaVenta.hora}</p>
                    <p className="text-base font-bold leading-7 text-gray-900"> CLIENTE: </p>
                    <p className="text-base font-bold leading-7 text-gray-900"> Nombre: {notaVenta.cliente.nombre}</p>
                    <p className="text-base font-bold leading-7 text-gray-900">Teléfono: {notaVenta.cliente.telefono}</p>
                    <p className="pb-12 text-base font-bold leading-7 text-gray-900">Correo: {notaVenta.cliente.correo}</p>
                    {/* <p className="py-3"><strong>Dirección:</strong> {notaVenta.direccion}</p>  */}
                <div>
                    <ListBookSaleRows head={head} body={notaVenta.Libros}/>
                    <div className="mt-5">
                        <p className="font-bold">SUB_TOTAL: {notaVenta.total}</p>
                        <p className="font-bold">TOTAL: {notaVenta.total}</p>
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
  