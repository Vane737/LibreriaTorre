import { useNavigate } from 'react-router-dom';
import { MyModal } from '../../components/utils';
import { useListDatas } from '../../hook';
import { ListUserRows } from '../../components/row';
import { useState, useEffect } from 'react';
import api from '../../API/axios';

export const ListUsers = () => {
  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/usuario');
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [userId, setUserId] = useState(null);
  const head = ['id', 'nombre', 'correo', 'telefono', 'rol'];

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteUser(id);
      case 'vista':
        return navigate(`/admin/user/read/${id}`);
      case 'editar':
        return navigate(`/admin/user/edit/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar el usuario?';

  const handleDeleteUser = (id) => {
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
    const deleteUser = async () => {
      if (isAccept && userId) {
        const { data, status } = await api.delete(`/usuario/${userId}`);
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteUser();
  }, [isAccept, userId]);

  const handleClickCreate = ()=>{
    navigate('/admin/user/create');
  }

  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
      <div className='flex justify-between pr-4 py-3'>
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
        onClick={handleClickCreate}>Añadir Nuevo Usuario</button>
      </div>
        <hr />
        {loading ? (
          <p>Cargando</p>
        ) : (
          <ListUserRows head={head} body={listData.usuarios} getId={handleClickOption} setEdit={true}/>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
};





