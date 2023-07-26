import { useListDatas } from "../../hook";


export const ListBitacora = () => {

  const { listData, loading } = useListDatas('/bitacora?limit=5');
  const head = ['Id','Actividad', 'Fecha', 'Hora', 'Usuario_ID'];
  console.log('listData', listData.bitacoras);

  return (
    <section className='w-full p-5'>
      <div className='mt-5 p-5 w-full'>
        <h1 className="text-2xl font-bold py-3">Bitacora</h1>

      {
        loading 
        ?
          <p>Cargando....</p>
        :
          <table className='table-fixed w-full'>
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
      </div>
    </section>
  )
};
