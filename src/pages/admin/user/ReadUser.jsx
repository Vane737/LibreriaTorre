import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../API/axios";

export const ReadUser = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const fetchUsuario = async () => {
      try {
          const response = await api.get(`/usuario/${id}`);
          console.log(response);
          setUsuario(response.data.usuario);
          setLoading(false);
      } catch (error) {
          console.error(error);
          setLoading(false);
      }
      };
      fetchUsuario();
  }, [id]);
  
  if (loading) {
      return <div>Cargando usuario...</div>;
  }
  
  if (!usuario) {
      return <div>No se encontró el usuario</div>;
  }
  
  return (
      <div className="w-full p-5">
          <div className="mt-5 p-5 w-full h-screen">
                  <h1 className="text-2xl font-bold py-6">USUARIO</h1>
                  <p className="py-3"><strong>Id:</strong> {usuario.id}</p>
                  <p className="py-3"><strong>Nombre:</strong> {usuario.nombre}</p>
                  <p className="py-3"><strong>Email:</strong> {usuario.correo}</p>
                  <p className="py-3"><strong>Teléfono:</strong> {usuario.telefono}</p>
                  <p className="py-3"><strong>Rol:</strong> {usuario.role.nombre}</p>
                  {/* <p className="py-3"><strong>Ultima vez que inicio sesión:</strong> {usuario.hora}, {usuario.fecha}</p> */}
                  {/* <p className="py-3"><strong>Ultima vez que cerro sesión:</strong> {usuario.hora}, {usuario.fecha}</p> */}
          </div>
      </div>
  );
}
