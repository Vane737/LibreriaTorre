import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultImage from '../../../assets/img/default.jpg'

import api from "../../../API/axios";

export const ReadBookProvider = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchLibro = async () => {
      try {
          const response = await api.get(`/libro/${id}`);
          // console.log(response);
          setLibro(response.data.libro);
          setLoading(false);
      } catch (error) {
          // console.error(error);
          setLoading(false);
      }
      };
      fetchLibro();
  }, [id]);


    
    
    
    if (loading) {
        return <div>Cargando libro...</div>;
      }
    
      if (!libro) {
        return <div>No se encontró el libro</div>;
      }
      const nombresAutores = libro.autores.map((autor) => autor.nombre).join(', ');
      console.log(nombresAutores);
      
      return (
        <div className="w-full p-5">
          <div className="w-80 flex justify-between">
            <div className="ml-24 mt-5 p-5 w-full h-screen">
                    <h1 className="text-2xl font-bold py-6">Libro</h1>
                    <p className="py-3"><strong>Id:</strong> {libro.id}</p>
                    <p className="py-3"><strong>Titulo:</strong> {libro.titulo}</p>
                    <p className="py-3"><strong>Autores:</strong> {nombresAutores}</p>
                    <p className="py-3"><strong>Categoria:</strong> {libro.categoria.nombre}</p>
                    <p className="py-3"><strong>Editorial:</strong> {libro.editoriale.nombre}</p>
                    <p className="py-3"><strong>Fecha de publicación:</strong> {libro.fecha_publicacion}</p>
                    <p className="py-3"><strong>Precio:</strong> {libro.precio}</p>
                    {/* <p className="py-3"><strong>Mínimo de stock:</strong> {libro.direccion}</p>
                    <p className="py-3"><strong>Maximo de stock:</strong> {libro.direccion}</p> */}
            </div>
            <div>
              
              <img className='h-28 w-84 h-84 mt-15' src={ libro.img? libro.img :DefaultImage } alt={libro.titulo} />
            </div>
          <div>

          </div>
          </div>
        </div>
    );
}
