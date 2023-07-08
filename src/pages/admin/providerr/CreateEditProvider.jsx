import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../../API/axios";
import { useForm } from "react-hook-form";

export default function CreateEditProdiver() {
  let {id} = useParams();
  const navigate = useNavigate();

  //form
  const {
    register,
    handleSubmit
  } = useForm();
  
  
  const handleProviderSubmit = (data) => {
    if(id){
      //editar
      console.log(id)
    }else{
      //crear
      api.post("proveedor", data).
      then((res) => {
        console.log(res);
        navigate("/admin/providers");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        REGISTRAR PROVEEDOR
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
            Registrar
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
