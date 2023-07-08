import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { useEffect, useState } from "react";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import axios from "axios";

export const Shoppings = () => {
  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/compras');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [shoppingId, setShoppingId] = useState(null);
  const head = ['id', 'proveedor', 'comprador', 'fecha', 'hora','total', 'opciones'];


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

  useEffect(() => {
    const deleteShopping = async () => {
      if (isAccept && shoppingId) {
        const { data, status } = await axios.delete(`/compra/${shoppingId}`);
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
      </div>
    </div>
  );
}
