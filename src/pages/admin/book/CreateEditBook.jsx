import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../API/axios";
import { useEffect, useState } from "react";

export default function CreateEditBook() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [editorial, setEditorial] = useState("");
  const [image, setImage] = useState();


  useEffect(() => {
    api
      .get(`/categoria`)
      .then((res) => {
        setCategorias(res.data.categorias);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //handlers
  const handleBookSubmit = (e) => {
    e.preventDefault();
    const data = {
      titulo: title,
      precio: parseInt(price),
      fecha_publicacion: date,
      categoriaId: parseInt(categoriaId),
      editorial: editorial,
      autores: authors,
      img: image,
    }
    const token = localStorage.getItem('x-token');
    console.log("data", data);
    if (id) {
      //editar
      api
        .put(`libro/${id}`, data)
        .then((res) => {
          console.log(res);
          navigate("/admin/providers");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //crear
      // const formData = new FormData();
      // for (let key in data) {
      //   formData.append(key, data[key]);
      // }

      // for (const entry of formData.entries()) {
      //   console.log(entry[0] + ": " + entry[1]);
      // }
      

      // const camposArray = [...formData.entries()];
      // const longitud = camposArray.length;
      // console.log("longitud", longitud);
      api
        .post("/libro", data,{
          headers: {
            "x-token": token,
          }
        })
        .then((res) => {
          console.log(res);
          navigate("/admin/book");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Handle add author
  const handleAddAuthor = () => {
    setAuthors([...authors, authorName]);
    setAuthorName("");
  }

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR LIBRO" : "REGISTRAR LIBRO"}
      </h1>
      <form onSubmit={handleBookSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block mb-2 w-full">
            NOMBRE
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block mb-2">
            PRECIO
          </label>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha_publicacion" className="block mb-2">
            FECHA DE PUBLICACION
          </label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="direccion" className="block mb-2">
            CATEGORIA
          </label>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            {...register("categoriaId")}
          >
            {categorias.map((categoria, i) => {
              return (
                <option key={i} value={categoria.id}>
                  {categoria.nombre}
                </option>
              );
            })}
          </select>
        </div> */}
        <div className="mb-4">
          <label htmlFor="fecha_publicacion" className="block mb-2">
            CATEGORIA
          </label>
          <input
            type="text"
            onChange={(e) => setCategoriaId(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha_publicacion" className="block mb-2">
            EDITORIAL
          </label>
          <input
            type="text"
            onChange={(e) => setEditorial(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block mb-2">
            AUTOR
          </label>
          <input
            type="text"
            onChange={(e) => {setAuthorName(e.target.value)}}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
          <button onClick={handleAddAuthor}>Agregar autor</button>
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block mb-2">
            IMAGEN
          </label>
          <input
            type="file"
            onChange={handleChangeImage}
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
  );
}
