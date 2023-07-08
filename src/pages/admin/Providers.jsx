import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import axios from "axios";



export const Providers = () => {

  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/proveedor');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [providerId, setUserId] = useState(null);
  const head = ['id', 'nombre', 'correo', 'telefono', 'dirección'];


  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteProvider(id);
      case 'vista':
        return navigate(`/admin/´provider/read/${id}`);
      case 'editar':
        return navigate(`/admin/provider/edit/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar el Proveedor?';
  
  const handleDeleteProvider = (id) => {
    setUserId(id);
    setIsOpen(true);
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    const deleteProvider = async () => {
      if (isAccept && providerId) {
        const { data, status } = await axios.delete(`/proveedor//${providerId}`);
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteProvider();
  }, [isAccept, providerId]);

  const handleClickCreate = ()=>{
    navigate('/admin/provider/create');
  }

  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        <div className='flex justify-between pr-4 py-3'>
          <h1 className="text-2xl font-bold">Proveedores</h1>
          <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
          onClick={handleClickCreate}>Añadir Nuevo</button>
        </div>
        {loading ? (
          <p>Cargando....</p>
        ) : (
        <ListUserRows head={head} body={listData.proveedores} getId={handleClickOption}/>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
};
