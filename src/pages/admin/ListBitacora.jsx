import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListDatas } from "../../hook";
import { ListUserRows } from "../../components/row";
import { MyModal } from "../../components/utils";
import api from "../../API/axios";


export const ListBitacora = () => {

  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/bitacora');
  const [isOpen, setIsOpen] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const [isAccept, setIsAccept] = useState(false);
  const head = ['Actividad', 'Fecha', 'Hora', 'Usuario_ID'];
  // const [search, setSearch] = useState("");
  // const [filteredBooks, setFilteredBooks] = useState([]);
  // const [books, setBooks] = useState([])
  console.log('listData', listData.bitacoras);
  useEffect(() => {
    const deleteProvider = async () => {
      if (isAccept && providerId) {
        const { data, status } = await api.delete(`/proveedor/${providerId}`,{
          headers: {
            'x-token': localStorage.getItem('x-token'),
          }
        });
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
    <section className='w-full p-5'>
      <div className='mt-5 p-5 w-full h-screen'>
        <div className='flex justify-between pr-4 py-3'>
            <h1 className="text-2xl font-bold">Libros</h1>
            <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
            onClick={handleClickCreate}>Añadir Nuevo Libro</button>
        </div>
      </div>
      <table className='text-center table-fixed w-80 drop-shadow-md'>
        <thead className='bg-custom-celeste h-10'>
          <tr className='pt-3 pb-3'>
            {
              head.map((h,i) =>(
                <th key={i}>{h}</th>
              ))
            }          
          </tr>
        </thead>
        <tbody>
          {
              listData.bitacoras.map((b,i)=>(
                  (i%2 === 1)
                  ?
                <tr className= 'py-3 bg-custom-grey text-center h-12' key={i}>
                  <th className='py-2'>{b.actividad}</th>
                  <th>{b.fecha}</th>
                  <th>{b.hora}</th>
                  <th>{b.usuarioId}</th>
                </tr>
              :
              <tr className= 'py-3 bg-white pt-2 pb-2 text-center' key={i}>
                  <th className='py-2'>{b.actividad}</th>
                  <th>{b.fecha}</th>
                  <th>{b.hora}</th>
                  <th>{b.usuarioId}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
};
