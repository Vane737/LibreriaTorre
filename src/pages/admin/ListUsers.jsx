import { useNavigate } from 'react-router-dom';
import { MyModal } from '../../components/utils';
import { useListDatas } from '../../hook';
import { ListUserRows } from '../../components/row';
import { useState, useEffect } from 'react';
import axios from '../../API/axios';

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

  const textBorrar = 'Estás seguro de eliminar el Usuario?';

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
        const { data, status } = await axios.delete(`/usuario/${userId}`);
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteUser();
  }, [isAccept, userId]);

  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        <h1>Users</h1>
        <hr />
        {loading ? (
          <p>Cargando</p>
        ) : (
          <ListUserRows head={head} body={listData.usuarios} getId={handleClickOption} />
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
};