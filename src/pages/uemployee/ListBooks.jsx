import {useNavigate} from 'react-router-dom'
import { MyModal } from '../../components/utils';
import {useListDatas} from '../../hook'
import {ListUserRows} from '../../components/row'
import { useState , useEffect} from 'react';

import axios from '../../API/axios';


export const ListBooks = () => {
  const navigate = useNavigate();
  const {listData,loading, status} = useListDatas('/libro')
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [bookId, setBookId] = useState(null);
 
  const head = [
    'id',
    'titulo',
    'fecha_publicacion',
    'precio',
    'categoria',
    'editorial',
   ]
  const textBorrar = 'Estas seguro de Eliminar el libro?'
  const handleClickOption = ({id , option})=>{
    console.log(id, option, status);
    switch (option) {
      case 'borrar':
        return handleDeleteBook(id);
      case 'vista':
        return navigate(`/admin/book/read/${id}`)
      case 'editar':
        return navigate(`/admin/book/edit/${id}`)
      default:
        break;
    }
  }
  const handleDeleteBook = (id) => {
    setBookId(id);
    setIsOpen(true);
  };
  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setBookId(null);
    }
  };
  useEffect(() => {
    const deleteBook = async () => {
      if (isAccept && bookId) {
        const {status } = await axios.delete(`/libro/${bookId}`);
        if (status >= 400) return;
        window.location.reload();
      }
    };
    deleteBook();
  }, [isAccept, setBookId]);

  const handleClickCreate = ()=>{
    navigate('/admin/book/create');
  }
  return (
    <section className='w-full p-5'>
      <div className='mt-5 p-5 w-full h-screen'>
        <div className='flex justify-between pr-4 py-3'>
            <h1 className="text-2xl font-bold">Libros</h1>
            <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
            onClick={handleClickCreate}>Añadir Nuevo Libro</button>
        </div>
        <hr/>
        {
          loading 
          ?<p>Cargando</p>
          :<ListUserRows head={head} body={listData.usuarios} getId={handleClickOption}/>
        }
        {
          isOpen && <MyModal Text={textBorrar} estados={closeModal} />
        }
      </div>
    </section>
  )
}

