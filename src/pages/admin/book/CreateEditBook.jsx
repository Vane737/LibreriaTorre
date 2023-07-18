import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../API/axios";

export default function CreateEditBook () {
  let { id } = useParams();
  const navigate = useNavigate();

  //form
  const {
    register,
    handleSubmit,
    // reset
  } = useForm();

  //handlers
  const handleBookSubmit = (data) => {
    console.log('data', data);
    if (id) {
      //editar
      api.put(`libro/${id}`, data)
        .then((res) => {
          console.log(res);
          navigate("/admin/providers");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //crear
      const formData = new FormData();
      formData.append('img', data.img[0]);
      for (let key in data) {
        if (key !== 'img') {
          formData.append(key, data[key]);
        }
      }
      for (const entry of formData.entries()) {
        console.log(entry[0] + ': ' + entry[1]);
      }

      const camposArray = [...formData.entries()];
      const longitud = camposArray.length;
      console.log('longitud', longitud);
      api.post("/libro", formData)
        .then((res) => {
          console.log(res);
          navigate("/admin/book");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR LIBRO" : "REGISTRAR LIBRO"}
      </h1>
      <form onSubmit={handleSubmit(handleBookSubmit)}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block mb-2 w-full">
            NOMBRE
          </label>
          <input
            type="text"
            {...register("titulo")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block mb-2">
            PRECIO
          </label>
          <input
            type="text"
            {...register("precio")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha_publicacion" className="block mb-2">
            FECHA DE PUBLICACION
          </label>
          <input
            type="date"
            {...register("fecha_publicacion")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block mb-2">
            CATEGORIA
          </label>
          <input
            type="text"
            {...register("categoria")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="mb-4 w-full">
            <label htmlFor="autores" className="block mb-2">
              AUTOR
            </label>
            <input
              type="text"
              {...register("autores")}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="editorial" className="block mb-2">
              EDITORIAL
            </label>
            <input
              type="text"
              {...register("editorial")}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="mb-4">
            <label htmlFor="img" className="block mb-2">
              IMAGEN
            </label>
            <input
              type="file"
              {...register("img")}
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
            to="/admin/books"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
