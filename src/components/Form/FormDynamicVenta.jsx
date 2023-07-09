import { useState } from "react";
// import axios from "../../API/axios";
// import { debounce } from "lodash";

export const FormDynamicVenta = () => {
  // const [search, setSearch] = useState("");
  
  // const [titulo, setTitulo] = useState("");
  const [datosList, setDatosList] = useState([
    { id: '1', titulo:'Codigo', cantidad: 3, precio: 50.00, descuento: 10},
    { id: '2', titulo:'Java para principiantes', cantidad: 5, precio: 60.00, descuento: 0},
    { id: '3', titulo:'Python for Develop', cantidad: 2, precio: 70.00, descuento: 0},
    { id: '4', titulo:'Coraline', cantidad: 2, precio: 100.00, descuento: 0}
  ]);

  const [date, setDate] = useState({
    id: "",
    cantidad: 0,
    precio: 0.0,
    descuento: 0,
  });

  const handleClickAdd = ()=>{
    setDatosList(...datosList, date);
  }
  //para el libro
  // const getLibro = async () => {
  //   try {
  //     const { data, status } = await axios.get("/libro/mostrar", titulo);
  //     console.log(data, status);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleChangeText = ({ target }) => {
  //   setTitulo(target.value);
  //   // debouncedFetchData();
  // };

//   const handleChangeSearch = ({ target }) => {
//   const searchTerm = target.value.toLowerCase();
//   setSearch(searchTerm);
  
//   if (searchTerm === '') {
//     setFilteredBooks([]);
//   } else {
//     const filteredBooks = books.filter((book) => {
//       return (
//         book.libro.toString().includes(searchTerm)
//       );
//     });
//     setFilteredBooks(filteredBooks);
//   }
// };
  

// const debouncedFetchData = debounce(getLibro, 3000);

  const handleChangeNumber = ({ target }) => {
    const { name, value } = target;
    setDate({
      ...date,
      [name]: value,
    });
  };


  // const detalleVenta = [
  //   { id: '1', titulo:'Codigo', cantidad: 3, precio: 50.00, descuento: 10},
  //   { id: '2', titulo:'Java para principiantes', cantidad: 5, precio: 60.00, descuento: 0},
  //   { id: '3', titulo:'Python for Develop', cantidad: 2, precio: 70.00, descuento: 0},
  //   { id: '4', titulo:'Coraline', cantidad: 2, precio: 100.00, descuento: 0}
  // ];

const handleRemoveDetalle = (id) => {
  const newDataList = datosList.filter((detalle) => detalle.id !== id);
  setDatosList(newDataList);
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
                // onChange={handleChangeSearch}
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
          { datosList.map((detalle, i) => {
            return(
              <tr className="bg-custom-grey" key={i}>
                <th>{detalle.titulo}</th>
                <th>{detalle.id}</th>
                <th>{detalle.cantidad}</th>
                <th>{detalle.precio}</th>
                <th>{detalle.descuento}</th>
                <th className="p-2">
                  <button className="bg-custom-red rounded-md p-2" onClick={ () => handleRemoveDetalle(detalle.id) }>Eliminar</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
