// import {
//     FormDynamicVenta
//   } from '../../../components/Form'

import { useEffect, useState } from "react";
import api from "../../../API/axios";
import { useParams } from "react-router";

  
  export const ReadSale = () => {
    const { id } = useParams();
    const head = ['Libro', 'Id', 'Cantidad', 'Precio Unitario','Descuento'];
    const [notaVenta, setNotaVenta] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchVenta = async () => {
        try {
            const response = await api.get(`/venta/${id}`);
            console.log(response.data.notaVenta);
            setNotaVenta(response.data.notaventa);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        };
        fetchVenta();
    }, [id]);
    
    return (
        <div className="w-full p-5">
            <div className="mt-5 p-5 w-full h-screen">
                    <h1 className="text-2xl font-bold py-6">Proveedor</h1>
                    <p className="py-3"><strong>Id:</strong> {notaVenta.id}</p>
                    <p className="py-3"><strong>Nombre:</strong> {notaVenta.nombre}</p>
                    <p className="py-3"><strong>Email:</strong> {notaVenta.correo}</p>
                    <p className="py-3"><strong>Teléfono:</strong> {notaVenta.telefono}</p>
                    <p className="py-3"><strong>Dirección:</strong> {notaVenta.direccion}</p>
            </div>
        </div>
    )
  }
  