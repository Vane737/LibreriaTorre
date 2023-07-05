import { useState} from "react"
import axios from '../../API/axios'
import {debounce} from 'lodash'
export const FormDynamicVenta = () => {
  const [titulo, setTitulo] = useState('');
  const [date, setDate] = useState({
    id: '',
    cantidad: 0,
    precio: 0.00,
    descuento: 0
  });
  const handleClickAdd = ()=>{
    console.log('click');
  }
  //para el libro
  const getLibro = async()=>{
    try {
      const {data,status} = await axios.get('/libro/mostrar',titulo)
      console.log(data, status);
    } catch (err) {
      console.log(err);
    }
  }
  const handleChangeText= ({target})=>{
    setTitulo(target.value);
    debouncedFetchData();
  }

  const debouncedFetchData = debounce(getLibro, 3000);

  
  const handleChangeNumber= ({target})=>{
    const {name,value}=target;
    setDate({
      ...date,
      [name]: value
    });
  }
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
              <input type="text" name="titulo" className="rounded-md w-11/12 border-2 border-solid border-black font-normal text-lg pl-2" value={titulo} onChange={handleChangeText}/>
            </th>
            <th className="font-normal text-lg">
              <p id="libroId">{date.id}</p>
            </th>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input type="number" min={1} name="cantidad" className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2" onChange={handleChangeNumber}/>
            </th>
            <th className="font-normal text-lg"> 
              <p id='precio'>{date.precio}</p>
            </th>
            <th className="flex items-center justify-center pt-3 pb-3">
              <input type="number" max={100} min={1} name="descuento" className="rounded-md w-1/3 border-2 border-solid border-black font-normal text-lg pl-2" onChange={handleChangeNumber}/>
            </th>
            <th>
              <button onClick={handleClickAdd} className="bg-custom-grey p-2 rounded-md">Agregar</button>
            </th>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full">
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
          <tr className="bg-custom-grey">
            <th className="pb-2 pt-2">asdsafa</th>
            <th>asdfafa</th>
            <th>gadsgfas</th>
            <th>fgasagasa</th>
            <th>safafasf</th>
            <th className="p-2">
              <button className="bg-custom-red rounded-md p-2">Eliminar</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
