import {useListDatas} from '../../hook'
import { CardBook } from '../../components/CardBook';


export const ListBooksClient = () => {
  const {listData,loading} = useListDatas('/libro')
  

  return (
    <section className='w-full p-5 bg-white'>
      <div className='mt-5 p-5 w-full h-screen'>
        <h1 className="text-2xl font-bold mb-12">LIBROS DISPONIBLES</h1>
        {/* <hr/> */}
        <div className="grid grid-cols-4 ">
          {
            loading 
            ?<p>Cargando libros...</p>
            : 
              listData.usuarios.map((book, i) => {
                return (
                  <div className='text-center' key={i} >
                    <CardBook book={book} />
                  </div>
                )
              })
          }

        </div>
      </div>
    </section>
  )
}

