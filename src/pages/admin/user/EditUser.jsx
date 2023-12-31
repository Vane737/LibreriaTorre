import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../API/axios";
import { useEffect, useState } from "react";
export default function EditUser() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  //form
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api
      .get(`/usuario/roles`)
      .then((res) => {
        setRoles(res.data.roles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roles]);

  //handlers
  const handleUserSubmit = (data) => {
    api
      .put(`usuario/${id}`, data)
      .then((res) => {
        console.log(res);
        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      api
        .get(`/usuario/${id}`)
        .then((res) => {
          console.log(res.data.usuario);
          reset({
            nombre: res.data.usuario.nombre,
            correo: res.data.usuario.correo,
            telefono: res.data.usuario.telefono,
            rolId: res.data.usuario.role.id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reset, id]);

  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        EDITAR USUARIO 
      </h1>
      <form onSubmit={handleSubmit(handleUserSubmit)}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 w-full">
            NOMBRE
          </label>
          <input
            type="text"
            {...register("nombre")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block mb-2">
            EMAIL
          </label>
          <input
            type="email"
            {...register("correo")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="mb-4 w-full">
            <label htmlFor="telefono" className="block mb-2">
              TELEFONO
            </label>
            <input
              type="text"
              {...register("telefono")}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="direccion" className="block mb-2">
              ROL
            </label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              {...register("rolId")}
            >
              {roles.map((rol, i) => {
                return (
                  <option key={i} value={rol.id}>
                    {rol.nombre}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-custom-yellow rounded-md p-2 block w-full mb-4"
          >
            Actualizar
          </button>
          <Link
            type="button"
            className="bg-custom-red rounded-md text-center p-2 block w-full"
            to="/admin/users"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
