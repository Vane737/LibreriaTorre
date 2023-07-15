import { useEffect, useState } from "react";
// import axios from "../../API/axios";
// import { debounce } from "lodash";
import io from "socket.io-client";
import api from "../../API/axios";
import { useNavigate } from "react-router";
import { parseInt } from "lodash";
import { Link } from "react-router-dom";
const socket = io("https://si1libreria-production-6536.up.railway.app");
export const FormDynamicVenta = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [book, setBook] = useState({});
  const [arrDetalle, setArrDetalle] = useState([]);
  const [descuento, setDescuento] = useState(0.0);
  const [cantidad, setCantidad] = useState(0);
  const [tipoPago, setTipoPago] = useState([]);
  const [cliente, setCliente] = useState("");
  const [pagoOption, setPagoOption] = useState(1);
  const [copiaDetalles, setCopiaDetalles] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0.0);

  const handleClickAdd = () => {
    const total = cantidad * book.precio - descuento;
    const detalle = { ...book, cantidad, descuento, title, precioTotal: total };
    const copiaDetalle = { libroId: book.id, cantidad: cantidad };
    setArrDetalle([...arrDetalle, detalle]);
    setCopiaDetalles([...copiaDetalles, copiaDetalle]);
    setPrecioTotal(precioTotal + total);
  };

  useEffect(() => {
    api
      .get(`/venta/pagos/tipos-pagos`)
      .then((res) => {
        setTipoPago(res.data.pagosDB);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      socket.emit("fetchBook", title);
    }
  };

  useEffect(() => {
    socket.on("bookData", (data) => {
      const newBook = { ...book, id: data.id, precio: data.precio };
      setBook(newBook);
    });
  }, [book]);

  const handleVentaSubmit = () => {
    const token = localStorage.getItem("x-token");
    const copiaDetallesC = copiaDetalles.map((detalle) => ({
      ...detalle,
      cantidad: parseInt(detalle.cantidad),
    }));
    console.log('Esta es una copia de Detalles', copiaDetallesC);
    const venta = {
      cliente: cliente,
      detalles: copiaDetallesC,
      pagoId: pagoOption,
    };

    api
      .post("/venta", venta, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/sales");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveDetalle = (id) => {
    const newDataList = arrDetalle.filter((detalle) => detalle.id !== id);
    setArrDetalle(newDataList);
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
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </th>
            <th className="font-normal text-lg">
              <p id="libroId">{book.id}</p>
            </th>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input
                type="number"
                min={1}
                name="cantidad"
                className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2"
                onChange={(e) => setCantidad(e.target.value)}
              />
            </th>
            <th className="font-normal text-lg">
              <p id="precio">{book.precio}</p>
            </th>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input
                type="number"
                max={100}
                min={1}
                name="descuento"
                className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2"
                onChange={(e) => setDescuento(e.target.value)}
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
                  <button className="bg-custom-red rounded-md p-2"
                  onClick={() => handleRemoveDetalle(detalle.id)}>
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
          Cliente
        </label>
        <input
          id="cliente"
          type="text"
          name="cliente"
          className="rounded-md .w-1\/2 border-2 border-solid border-black font-normal text-lg pl-2 mr-64"
          placeholder="Cliente"
          onChange={(e) => setCliente(e.target.value)}
        />
        <label htmlFor="cliente" className="mr-5 font-bold">
          Tipo de Pago
        </label>
        <select
          className="rounded-md border-2 border-solid border-black font-normal text-lg pl-2"
          value={pagoOption}
          onChange={(e) => setPagoOption(e.target.value)}
        >
          {tipoPago.map((pago, i) => {
            return (
              <option key={i} value={pago.id}>
                {pago.nombre}
              </option>
            );
          })}
        </select>
      </div>
      <div className="my-5 font-bold">
        <label htmlFor="total" className="m-2">
          Sub_total(bs): {precioTotal}
        </label>
      </div>
      <div className="mt-64 text-center">
        <button
          className="bg-custom-green rounded-md p-2 font-bold text-white px-10 py-2 mx-5"
          onClick={handleVentaSubmit}
        >
          Guardar
        </button>
        <Link
          to="/admin/sales" 
          className="bg-custom-red rounded-md p-2 font-bold text-white px-10 py-2 mx-5">
          Cancelar
        </Link>
      </div>
    </div>
  );
};
