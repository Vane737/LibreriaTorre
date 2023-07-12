import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import api from "../../API/axios";


export const Providers = () => {

  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/proveedor');
  const [isOpen, setIsOpen] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const [isAccept, setIsAccept] = useState(false);
  const head = ['Id', 'Nombre', 'Correo', 'Telefono', 'Dirección'];
  // const [search, setSearch] = useState("");
  // const [filteredBooks, setFilteredBooks] = useState([]);
  // const [books, setBooks] = useState([])

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteProvider(id);
      case 'vista':
        return navigate(`/admin/provider/read/${id}`);
      case 'editar':
        return navigate(`/admin/provider/edit/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar el Proveedor?';
  
  const handleDeleteProvider = (id) => {
    setProviderId(id);
    setIsOpen(true);
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setProviderId(null);
    }
  };

  useEffect(() => {
    const deleteProvider = async () => {
      if (isAccept && providerId) {
        const { data, status } = await api.delete(`/proveedor/${providerId}`);
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
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <div className='flex justify-between pr-4 py-3'>
          {/* <input
                type="text"
                name="titulo"
                className="rounded-md w-1\/2 border-2 border-solid border-black font-normal text-lg pl-2"
                placeholder="Buscar proveedor"
                onChange={handleChangeSearch}
              /> */}
          <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
          onClick={handleClickCreate}>Añadir Nuevo</button>
        </div>
        {loading ? (
          <p>Cargando....</p>
        ) : (
        <ListUserRows head={head} body={listData.proveedores} getId={handleClickOption} setEdit={true}/>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
    </div>
  );
};
