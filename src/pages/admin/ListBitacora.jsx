import { useListDatas } from "../../hook";


export const ListBitacora = () => {

  const { listData, loading } = useListDatas('/bitacora?limit=5');
  const head = ['Id','Actividad', 'Fecha', 'Hora', 'Usuario_ID'];
  console.log('listData', listData.bitacoras);

  return (
    <section className='w-full p-5'>
      <div className='w-full'>
        <div className='flex justify-between pr-4 py-5'>
            <h1 className="text-2xl font-bold">Bitacora</h1>
        </div>
      </div>
      {
        loading 
        ?
          <p>Cargando....</p>
        :
          <table className='text-center table-fixed w-80 drop-shadow-md my-5'>
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
                      <th className='py-2'>{b.id}</th>
                      <th className='py-2'>{b.actividad}</th>
                      <th>{b.fecha}</th>
                      <th>{b.hora}</th>
                      <th>{b.usuarioId}</th>
                    </tr>
                  :
                  <tr className= 'py-3 bg-white pt-2 pb-2 text-center' key={i}>
                      <th className='py-2'>{b.id}</th>
                      <th className='py-2'>{b.actividad}</th>
                      <th>{b.fecha}</th>
                      <th>{b.hora}</th>
                      <th>{b.usuarioId}</th>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </section>
  )
};
