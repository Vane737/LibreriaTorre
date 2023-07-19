import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../../API/axios";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function CreateEditProdiver() {
  let { id } = useParams();
  const navigate = useNavigate();

  //form
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  
  //handlers
  const handleProviderSubmit = (data) => {
    const token = localStorage.getItem("x-token");
    if(id){
      //editar
      api.put(`proveedor/${id}`, data, {
        headers: {
          "x-token": token
        }
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/providers");
      })
      .catch((err) => {
        console.log(err);
      })
    }else{
      //crear
      api.post("proveedor", data, {
        headers: {
          "x-token": token
        }
      }).
      then((res) => {
        console.log(res);
        navigate("/admin/providers");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  useEffect(() =>{
    if (id) {
      api.get(`/proveedor/${id}`)
      .then((res) => {
        console.log(res);
        reset({
          nombre: res.data.proveedor.nombre,
          correo: res.data.proveedor.correo,
          direccion: res.data.proveedor.direccion,
          telefono: res.data.proveedor.telefono
        });
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },[id, reset]);

  //render
  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR PROVEEDOR" : "REGISTRAR PROVEEDOR"}
      </h1>
      <form onSubmit={handleSubmit(handleProviderSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 w-full">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("correo")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="direccion" className="block mb-2">
            Dirección
          </label>
          <input
            type="text"
            {...register("direccion")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block mb-2">
            Teléfono
          </label>
          <input
            type="text"
            {...register("telefono")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-custom-green rounded-md p-2 block w-full mb-4"
          >
            {id ? "Editar" : "Registrar"}
          </button>

          <Link
            type="button" 
            className="bg-custom-red rounded-md text-center p-2 block w-full"
            to="/admin/providers"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}