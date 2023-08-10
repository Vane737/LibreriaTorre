import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../../API/axios";
import { useForm } from "react-hook-form";

export default function CreateEditCategory() {
  let { id } = useParams();
  const navigate = useNavigate();

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  //handlers
  const handleProviderSubmit = (data) => {
    const token = localStorage.getItem("x-token");
    if(id){
      //editar
      api.put(`/categoria/${id}`, data, {
        headers: {
          "x-token": token
        }
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/categories");
      })
      .catch((err) => {
        console.log(err);
      })
    }else{
      //crear
      api.post("/categoria", data, {
        headers: {
          "x-token": token
        }
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/categories");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  //render
  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR CATEGORIA" : "REGISTRAR CATEGORIA"}
      </h1>
      <form onSubmit={handleSubmit(handleProviderSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 w-full">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
          {errors?.nombre?.type === "required" && <p className="text-red-600">El campo nombre es obligatorio*</p>}
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
            to="/admin/categories"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}