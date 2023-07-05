import { useNavigate } from 'react-router-dom';
import { useListDatas } from '../../hook';
import { ListUserRows } from '../../components/row';

export const ListSales = () => {
  const navigate = useNavigate();
  const { listData, loading } = useListDatas('/venta');
  const head = ['id', 'fecha', 'hora', 'total', 'tipo pago', 'cliente', 'vendedor'];

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return 'Hola mundo';
      case 'vista':
        return navigate(`/admin/user/read/${id}`);
      case 'editar':
        return navigate(`/admin/user/edit/${id}`);
      default:
        break;
    }
  };

  const handleClickCreate = ()=>{
    navigate('/admin/sale/create');
  }

  
  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        <div className='flex justify-end pr-4'>
          <button className='bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white'
          onClick={handleClickCreate}>Crear Nota de Venta</button>
        </div>
        {loading ? (
          <p>Cargando</p>
        ) : (
          <div className='pt-5'>
            <ListUserRows head={head} body={listData.ventas} getId={handleClickOption} />
          </div>
        )}
       
      </div>
    </div>
  );
}
