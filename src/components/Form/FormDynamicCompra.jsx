import { useEffect, useState } from "react";
// import axios from "../../API/axios";
// import { debounce } from "lodash";
import io from "socket.io-client";
import api from "../../API/axios";
import { useNavigate } from "react-router";
import { parseInt } from "lodash";
import { Link } from "react-router-dom";
const socket = io("https://si1libreria-production-6536.up.railway.app");
export const FormDynamicCompra = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [book, setBook] = useState({});
  const [arrDetalle, setArrDetalle] = useState([]);
  const [price, setPrice] = useState(0.0);
  const [cantidad, setCantidad] = useState(0);
  const [cliente, setCliente] = useState("");
  const [copiaDetalles, setCopiaDetalles] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0.0);



  // Aqui se añaden los detalles de una compra y se cacula su precio 
  const handleClickAdd = () => {
    const total = cantidad * price;
    const detalle = { ...book, cantidad, precio: price, title, precioTotal: total }; // habia Descuento
    const copiaDetalle = { libroId: book.id, cantidad: cantidad, precio: price};
    setArrDetalle([...arrDetalle, detalle]);
    setCopiaDetalles([...copiaDetalles, copiaDetalle]);
    setPrecioTotal(precioTotal + total);
  };

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      socket.emit("fetchBook", title);
    }
  };
// Manejo de socket - escucha 
  useEffect(() => {
    socket.on("bookData", (data) => {
      const newBook = { ...book, id: data.id };
      setBook(newBook);
    });
  }, [book]);

  const handleShoppingSubmit = () => {
    const token = localStorage.getItem("x-token");
    const copiaDetallesC = copiaDetalles.map((detalle) => ({
      ...detalle,
      cantidad: parseInt(detalle.cantidad),
      precio: parseInt(detalle.precio),
    }));

    const compra = {
      proveedor: cliente,
      detalles: copiaDetallesC,
    };
    api
      .post("/compra", compra, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/shoppings");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveDetalle = (id, preciototaldetalle) => {
    const newDataList = arrDetalle.filter((detalle) => detalle.id !== id );
    const newCopiaDetalles = copiaDetalles.filter((copiaDetalle) => copiaDetalle.libroId !== id );

    setArrDetalle(newDataList);
    setCopiaDetalles(newCopiaDetalles);
    setPrecioTotal(precioTotal - preciototaldetalle);
  };

  return (
    <div>
      <table className="table-fixed w-full">
        <thead className="bg-custom-celeste w-full">
          <tr className="pt-3 pb-3 w-full">
            <th>Libro</th>
            <th>Id</th>
            <th> Cantidad</th>
            <th>Precio</th>
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
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </th>
            <th className="font-normal text-lg">
              <p id="libroId">{book.id}</p>
            </th>
            <th className=" items-center justify-center pt-3 pb-3">
              <input
                type="number"
                name="cantidad"
                className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2"
                onChange={(e) => setCantidad(e.target.value)}
              />
            </th>
            {/* <th className="font-normal text-lg">
              <p id="precio">{book.precio}</p>
            </th> */}
            <th className="items-center justify-center pt-3 pb-3">
              <input
                type="number"
                name="price"
                className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2"
                onChange={(e) => setPrice(e.target.value)}
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
          {arrDetalle.map((detalle, i) => {
            return (
              <tr className="bg-custom-grey" key={i}>
                <th>{detalle.title}</th>
                <th>{detalle.id}</th>
                <th>{detalle.cantidad}</th>
                <th>{detalle.precio}</th>
                <th>{detalle.precioTotal}</th>
                <th className="p-2">
                  <button className="bg-custom-red rounded-md p-2" onClick={() => handleRemoveDetalle(detalle.id, detalle.precioTotal)}>
                    Eliminar
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-5 font-bold">
        <label htmlFor="cliente" className="m-2">
          Proveedor
        </label>
        <input
          id="cliente"
          type="text"
          name="cliente"
          className="rounded-md .w-1\/2 border-2 border-solid border-black font-normal text-lg pl-2 mr-64"
          placeholder="proveedor"
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>
      <div className="my-5 font-bold">
        <label htmlFor="total" className="m-2">
          Sub_total(bs): {precioTotal}
        </label>
      </div>
      <div className="mt-64 text-center">
        <button
          className="bg-custom-green rounded-md p-2 font-bold text-white px-10 py-2 mx-5"
          onClick={handleShoppingSubmit}
        >
          Guardar
        </button>
        <Link
          to="/admin/shoppings" 
          className="bg-custom-red rounded-md p-2 font-bold text-white px-10 py-2 mx-5">
          Cancelar
        </Link>
      </div>
    </div>
  );
};
