import PropTypes from 'prop-types'
// import {
//   AiFillEye
// } from 'react-icons/ai'
// import {
//   BsTrashFill
// } from 'react-icons/bs'
// import {BiEdit} from 'react-icons/bi'
// eslint-disable-next-line react/prop-types
export const ListBookRows = ({ head=[], body =[], getId, setAction }) => {
  //obtengo el id y la opcion que se selecciono (borrar,mostrar y editar)
  const onClickId = (b, option)=>{
    getId({
      id: b.id,
      option
    });
  }
  return (
    <table className='table-fixed w-full'>
      <thead className='bg-custom-celeste h-10'>
        <tr className='pt-3 pb-3'>
          {
            head.map((h,i) =>(
              <th key={i}>{h}</th>
            ))
          }          
        <th>
          Opciones
        </th>
        </tr>
      </thead>
      <tbody>
        {
            body.map((b,i)=>(
                (i%2 === 1)
                ?
                <tr className= 'bg-custom-grey text-center h-12' key={i}>
              {
                  Object.keys(b).map((value, i)=>(
                      <th className='font-normal' key={i}>{b[value].nombre?b[value].nombre:b[value]}</th>
                      ))
                    }
              {
                  setAction ? 
                  <th>
                        <div className='flex flex-wrap items-center justify-around pt-2 pb-2'>
                            <button className="rounded-full bg-custom-yellow p-1 text-white" onClick={()=>onClickId(b, 'eliminar')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                            </svg>                 
                            </button> 
                        </div>
                    </th> :
                    <></>
                }

            </tr>
            :
            <tr className= 'bg-white pt-2 pb-2 text-center' key={i}>
                {
                    Object.keys(b).map((value, i)=>(
                      <th className='font-normal' key={i}>{b[value].nombre?b[value].nombre:b[value]}</th>
                    ))
                }

                {
                    setAction ? 
                        <th>
                            <div className='flex flex-wrap items-center justify-around pt-2 pb-2'>
                                <button className="rounded-full bg-custom-yellow p-1 text-white" onClick={()=>onClickId(b, 'editar')}>
                                    Eliminar                 
                                </button> 
                            </div>
                        </th> :
                        <></>
                }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

ListBookRows.proptypes = {
  head : PropTypes.array.isRequired,
  body : PropTypes.array.isRequired,
  getId: PropTypes.func.isRequired
}