import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import api from "../../API/axios";
import Pagination from "../../components/utils/Pagination";


export const ListRoles = () => {

  const navigate = useNavigate();
  const regXPage = 15;
  const [ offset, setOffset ] = useState(0);
  const { listData, loading, regTotal } = useListDatas(`/usuario/roles?offset=${offset}&limit=${regXPage}`, offset);
  const [isOpen, setIsOpen] = useState(false);
  const [rolId, setRolId] = useState(null);
  const [isAccept, setIsAccept] = useState(false);
  const head = ['Id', 'Nombre'];
  // const [search, setSearch] = useState("");
  // const [filteredBooks, setFilteredBooks] = useState([]);
  // const [books, setBooks] = useState([])

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteRol(id);
      case 'vista':
        return navigate(`/admin/rol/read/${id}`);
      case 'editar':
        return navigate(`/admin/rol/edit/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar el Rol?';
  
  const handleDeleteRol = (id) => {
    setRolId(id);
    setIsOpen(true);
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setRolId(null);
    }
  };

  useEffect(() => {
    const deleteRol = async () => {
      const token = localStorage.getItem("x-token"); 
      if (isAccept && rolId) {
        const { data, status } = await api.delete(`rol/${rolId}`, {
          headers: {
            "x-token": token
          }
        });
        if (status >= 400) return;
        console.log(data);
        window.location.reload();
      }
    };

    deleteRol();
  }, [isAccept, rolId]);

  const handleOffsetChange = (numeroPag) => {
    setOffset(numeroPag);
  }

  const handleClickCreate = ()=>{
    navigate('/admin/rol/create');
  }

  // Buscar Proveedor
  // const handleChangeSearch = ({ target }) => {
  //   const searchTerm = target.value.toLowerCase();
  //   setSearch(searchTerm);
    
  //   if (searchTerm === '') {
  //     setFilteredBooks([]);
  //   } else {
  //     const filteredBooks = books.filter((book) => {
  //       return (
  //         book.libro.toString().includes(searchTerm)
  //       );
  //     });
  //     setFilteredBooks(filteredBooks);
  //   }
  // };
  
  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        
        <div className='flex justify-between pr-4 py-3'>
          <h1 className="text-2xl font-bold">Roles</h1>
          {/* <input
                type="text"
                name="titulo"
                className="rounded-md w-1\/2 border-2 border-solid border-black font-normal text-lg pl-2"
                placeholder="Buscar proveedor"
                onChange={handleChangeSearch}
              /> */}
          <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white' onClick={handleClickCreate}>Añadir Nuevo Rol</button>
        </div>
        {loading ? (
          <p>Cargando....</p>
        ) : (
          <>
            <ListUserRows head={head} body={listData.roles} getId={handleClickOption} setEdit={false} setSee={false}/>
            <Pagination  offset= {offset} regTotal ={ regTotal } onOffsetChange={handleOffsetChange} regXPage = {regXPage}/>
          </>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
};
