import { useState } from "react";
import axios from "../../API/axios";
import { debounce } from "lodash";

export const FormDynamicVenta = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([
    {
      libro: "El principito",
      id: "1",
      cantidad: 5,
      precio: 70,
      precioTotal: 350,
    },
    {
      libro: "El señor de los anillos",
      id: "2",
      cantidad: 5,
      precio: 70,
      precioTotal: 350,
    },
    {
      libro: "La sombra del viento",
      id: "3",
      cantidad: 5,
      precio: 70,
      precioTotal: 350,
    },
  ]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [date, setDate] = useState({
    id: "",
    cantidad: 0,
    precio: 0.0,
    descuento: 0,
  });
  const handleClickAdd = () => {
    console.log("click");
  };
  //para el libro
  const getLibro = async () => {
    try {
      const { data, status } = await axios.get("/libro/mostrar", titulo);
      console.log(data, status);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeText = ({ target }) => {
    setTitulo(target.value);
    debouncedFetchData();
  };

  const handleChangeSearch = ({ target }) => {
  const searchTerm = target.value.toLowerCase();
  setSearch(searchTerm);
  
  if (searchTerm === '') {
    setFilteredBooks([]);
  } else {
    const filteredBooks = books.filter((book) => {
      return (
        book.libro.toString().includes(searchTerm)
      );
    });
    setFilteredBooks(filteredBooks);
  }
};
  

  const debouncedFetchData = debounce(getLibro, 3000);

  const handleChangeNumber = ({ target }) => {
    const { name, value } = target;
    setDate({
      ...date,
      [name]: value,
    });
  };
  return (
    <div>
      <table className="table-fixed w-full">
        <thead className="bg-custom-celeste w-full">
          <tr className="pt-3 pb-3 w-full">
            <th> Libro</th>
            <th>Id</th>
            <th> Cantidad</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input
                type="text"
                name="titulo"
                className="rounded-md w-11/12 border-2 border-solid border-black font-normal text-lg pl-2"
                placeholder="Buscar libro"
                onChange={handleChangeSearch}
              />
            </th>
            <th className="font-normal text-lg">
              <p id="libroId">{date.id}</p>
            </th>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input
                type="number"
                min={1}
                name="cantidad"
                className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2"
                onChange={handleChangeNumber}
              />
            </th>
            <th className="font-normal text-lg">
              <p id="precio">{date.precio}</p>
            </th>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input
                type="number"
                max={100}
                min={1}
                name="descuento"
                className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2"
                onChange={handleChangeNumber}
              />
            </th>
            <th>
              <button
                onClick={handleClickAdd}
                className="bg-custom-grey p-2 rounded-md"
              >
                Agregar
              </button>
            </th>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full text-center p-5">
        <thead className="bg-custom-celeste w-full">
          <tr className="">
            <th>Libro</th>
            <th>Id</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Precio Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {search === '' ? (
          books.map((book, i) => (
            <tr key={i} className="bg-custom-grey pt-5">
              <td>{book.libro}</td>
              <td>{book.id}</td>
              <td>{book.cantidad}</td>
              <td>{book.precio}</td>
              <td>{book.precioTotal}</td>
              <td>
                <button className="bg-custom-red rounded-md p-2">Eliminar</button>
              </td>
            </tr>
          ))
        ) : (
          filteredBooks.map((book, i) => (
            <tr key={i} className="bg-custom-grey pt-5">
              <td>{book.libro}</td>
              <td>{book.id}</td>
              <td>{book.cantidad}</td>
              <td>{book.precio}</td>
              <td>{book.precioTotal}</td>
              <td>
                <button className="bg-custom-red rounded-md p-2">Eliminar</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      </table>
    </div>
  );
};
