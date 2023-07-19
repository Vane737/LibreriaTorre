import { useNavigate } from 'react-router-dom';
import { useListDatas } from '../../hook';
import { ListUserRows } from '../../components/row';
import { MyModal } from '../../components/utils';
import api from '../../API/axios';
import { useEffect, useState } from 'react';

// const response = await fetch(`API_ENDPOINT/ventas?limit=${limit}&offset=${offset}`);
export const ListSales = () => {
  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/venta');
  const head = ['id', 'fecha', 'hora', 'total', 'tipo pago', 'cliente', 'vendedor'];
  const [isAccept, setIsAccept] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saleId, setSaleId] = useState(null);

  
  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteSale(id);
      case 'vista':
        return navigate(`/employee/sale/read/${id}`);
      case 'editar':
        return navigate(`/employee/sale/edit/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar la Venta?';
  
  const handleDeleteSale = (id) => {
    setSaleId(id);
    setIsOpen(true);
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setSaleId(null);
    }
  };  
  
  useEffect(() => {
    
    const token = localStorage.getItem("x-token");
    const deleteSale = async () => {
      if (isAccept && saleId) {
        const { data, status } = await api.delete(`/venta/${saleId}`, {
          headers: {
            "x-token": token,
          },    
        });
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteSale();
  }, [isAccept, saleId]);

  const handleClickCreate = ()=>{
    navigate('/employee/sale/create');
  }

  
  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        <div className='flex justify-between pr-4'>
          <h1 className="text-2xl font-bold">Ventas</h1>
          <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
          onClick={handleClickCreate}>Crear Nota de Venta</button>
        </div>
        {loading ? (
          <p>Cargando</p>
        ) : (
          <div className='pt-5'>
            <ListUserRows head={head} body={listData.ventas} getId={handleClickOption} setEdit={false} />
          </div>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
}
