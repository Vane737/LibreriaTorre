import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { useEffect, useState } from "react";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import api from "../../API/axios";
import Pagination from "../../components/utils/Pagination";

export const ListShoppings = () => {
  const navigate = useNavigate();
  const 
  const { listData, loading, cantReg } = useListDatas(̣̣);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [shoppingId, setShoppingId] = useState(null);
  const head = ['Id', 'Fecha', 'Hora', 'Total', 'Comprador','Vendedor'];


  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteShopping(id);
      case 'vista':
        return navigate(`/admin/shopping/read/${id}`);
      case 'editar':
        return navigate(`/admin/shopping/edit/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar la Compra?';
  
  const handleDeleteShopping = (id) => {
    setShoppingId(id);
    setIsOpen(true);
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setShoppingId(null);
    }
  };

    // Funcion para calcular la cantidad de paginas en teniendo la cantidad de elementos por paginas
// parametros de entrada la cantidad total de registros y la cantidad de regitros a mostrar (limit)

// let cantElement = 12;
// let cantElementXPage = 6;



  useEffect(() => {
    const deleteShopping = async () => {
      const token = localStorage.getItem("x-token");
      if (isAccept && shoppingId) {
        const { data, status } = await api.delete(`/compra/${shoppingId}`, {
          headers: {
            "x-token": token,
          },    
        });        
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteShopping();
  }, [isAccept, shoppingId]);


  const handleClickCreate = ()=>{
    navigate('/admin/shopping/create');
  }
  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
      <div className='flex justify-between pr-4 py-3'>
          <h1 className="text-2xl font-bold">Compras</h1>
          <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
          onClick={handleClickCreate}>Añadir Nueva Compra</button>
      </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
        <ListUserRows head={head} body={listData.compras} getId={handleClickOption}/>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
        <Pagination  cantElement={ cantReg }/>
      </div>

    </div>
  );
}
