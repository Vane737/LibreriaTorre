import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import axios from "axios";



export const Providers = () => {

  // const datos = [
  //   { id: 1, nombre: "Juan Perez Ledezma", email: "juan@gmail.com", direccion: "Villa primero de mayo", telefono: "65465498712" },
  //   { id: 2, nombre: "Pedro  Lada", email: "pedro@gmail.com", direccion: "San martin", telefono: "3324558696" },
  //   { id: 3, nombre: "Alexander Vazques", email: "Alex@gmail.com", direccion: "Pampa de la isla", telefono: "3324558696" },
  //   { id: 4, nombre: "Ludez Manzano", email: "Lurdez@gmail.com", direccion: "Urubo norte", telefono: "3324558696" }
  // ];


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
        return navigate(`/admin/user/read/${id}`);
      case 'editar':
        return navigate(`/admin/user/edit/${id}`);
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
        const { data, status } = await axios.delete(`/provider/${providerId}`);
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteProvider();
  }, [isAccept, providerId]);

  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        <h1>Users</h1>
        <ListUserRows head={head} body={listData.proveedores} getId={handleClickOption}/>
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
};
