import { useForm } from 'react-hook-form';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'
import api from '../../../API/axios';
import { useEffect, useState } from 'react';
export default function CreateUser(){
  let { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  //form
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

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
  const handleBookSubmit = (data) => {
    if(id){
      //editar
      api.put(`usuario/${id}`, data)
      .then((res) => {
        console.log(res);
        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err);
      })
    }else{
      //crear
      api.post("usuario", data).
      then((res) => {
        console.log(res);
        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  useEffect(() =>{
    if (id) {
      api.get(`/usuario/${id}`)
      .then((res) => {
        console.log(res.data.usuario);
        reset({
          nombre: res.data.usuario.nombre,
          correo: res.data.usuario.correo,
          telefono: res.data.usuario.telefono,
          rolId: res.data.usuario.role.id
        });
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },[reset, id]);

  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR USUARIO" : "REGISTRAR USUARIO"}
      </h1>
      <form onSubmit={handleSubmit(handleBookSubmit)}>
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
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            CONTRASEÑA
          </label>
          <input
            type="password"
            {...register("password")}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block mb-2">
            REPETIR CONTRASEÑA
          </label>
          <input
            type="password"
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
            className="bg-custom-green rounded-md p-2 block w-full mb-4"
          >
            {id ? "Editar" : "Registrar"}
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
  )
}
