import PropTypes from 'prop-types'
// import {
//   AiFillEye
// } from 'react-icons/ai'
// import {
//   BsTrashFill
// } from 'react-icons/bs'
// import {BiEdit} from 'react-icons/bi'
export const ListUserRows = ({head=[], body =[], getId}) => {
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
              <th>
                  <div className='flex flex-wrap items-center justify-around pt-2 pb-2'>
                    {/* <AiFillEye className='cursor-pointer text-2xl' onClick={()=>onClickId(b, 'vista')}/> */}
                    {/* <BsTrashFill className='cursor-pointer text-2xl text-red-600' onClick={()=>onClickId(b, 'borrar')}/> */}
                    {/* <BiEdit className='cursor-pointer text-2xl text-yellow-500' onClick={()=>onClickId(b, 'editar')}/> */}
                  </div>
              </th>
            </tr>
            :
            <tr className= 'bg-white pt-2 pb-2 text-center' key={i}>
              {
                Object.keys(b).map((value, i)=>(
                  <th className='font-normal' key={i}>{b[value].nombre?b[value].nombre:b[value]}</th>
                ))
              }
              <th>
                <div className='flex flex-wrap items-center justify-around pt-2 pb-2'>
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