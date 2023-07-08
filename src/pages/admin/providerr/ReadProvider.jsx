import { useParams } from "react-router-dom";
import api from "../../../API/axios";
import { useEffect, useState } from "react";

export const ReadProdiver = () => {
    const { id } = useParams();
    const [proveedor, setProveedor] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProveedor = async () => {
        try {
            const response = await api.get(`/proveedor/${id}`);
            console.log(response);
            setProveedor(response.data.proveedor);
            console.log(proveedor);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        };
        fetchProveedor();
    }, [id]);
    
    if (loading) {
        return <div>Cargando proveedor...</div>;
    }
    
    if (!proveedor) {
        return <div>No se encontró el proveedor</div>;
    }
    
    return (
            <div className="w-full p-5">
                <div className="mt-5 p-5 w-full h-screen">
                        <h1 className="text-2xl font-bold py-6">Proveedor</h1>
                        <p className="py-3"><strong>Id:</strong> {proveedor.id}</p>
                        <p className="py-3"><strong>Nombre:</strong> {proveedor.nombre}</p>
                        <p className="py-3"><strong>Email:</strong> {proveedor.correo}</p>
                        <p className="py-3"><strong>Teléfono:</strong> {proveedor.telefono}</p>
                        <p className="py-3"><strong>Dirección:</strong> {proveedor.direccion}</p>
                </div>
            </div>
    );
};