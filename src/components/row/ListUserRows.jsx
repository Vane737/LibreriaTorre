import PropTypes from 'prop-types'
// import {
//   AiFillEye
// } from 'react-icons/ai'
// import {
//   BsTrashFill
// } from 'react-icons/bs'
// import {BiEdit} from 'react-icons/bi'
// eslint-disable-next-line react/prop-types
export const ListUserRows = ({ head=[], body =[], getId, setEdit, setSee = true, setDelete = true }) => {
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
                Object.keys(b).map((value, idx)=>(
                  <th className='font-normal' key={idx}>{b[value].nombre? b[value].nombre : value == 'inventario' ? b[value].cantidad : b[value]}</th>
                ))
              }
              <th>
                <div className='flex flex-wrap items-center justify-around'>
                {
                  setDelete ?
                    <button className="rounded-md p-2 text-red-600" onClick={()=>onClickId(b, 'borrar')}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>
                    </button>
                    :
                    <span></span>
                }
                { 
                  setEdit ? 
                    <button className="rounded-full bg-custom-yellow p-1 text-white" onClick={()=>onClickId(b, 'editar')}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>                 
                    </button> 
                    :
                    <span></span>
                }
                    {
                    setSee ?
                      <button className="rounded-md p-2" onClick={()=>onClickId(b, 'vista')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      :
                      <span></span> 
                    }
                  </div>
              </th>
            </tr>
            :
            <tr className= 'bg-white pt-2 pb-2 text-center' key={i}>
              {
                Object.keys(b).map((value, idx)=>(
                  <th className='font-normal' key={idx}>{b[value].nombre? b[value].nombre : value == 'inventario' ? b[value].cantidad : b[value]}</th>
                ))
              }
              <th>
                <div className='flex flex-wrap items-center justify-around'>
                  {
                    setDelete ? 
                    <button className="rounded-md p-2 text-red-600" onClick={()=>onClickId(b, 'borrar')}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>  
                    </button>
                    :
                    <span></span>
                  }
                  { 
                    setEdit ? 
                      <button className="rounded-full bg-custom-yellow p-1 text-white" onClick={()=>onClickId(b, 'editar')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>                 
                      </button> 
                      :
                      <span></span>
                  }
                  {
                    setSee ?
                      <button className="rounded-md p-2" onClick={()=>onClickId(b, 'vista')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      :
                      <span></span> 
                  }
                  {/* <AiFillEye className='cursor-pointer text-2xl' onClick={()=>onClickId(b, 'vista')}/> */}
                  {/* <BsTrashFill className='cursor-pointer text-2xl text-red-600' onClick={()=>onClickId(b, 'borrar')}/> */}
                  {/* <BiEdit className='cursor-pointer text-2xl text-yellow-500'onClick={()=>onClickId(b, 'editar')} /> */}
                </div>
              </th>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

ListUserRows.proptypes = {
  head : PropTypes.array.isRequired,
  body : PropTypes.array.isRequired,
  getId: PropTypes.func.isRequired
}