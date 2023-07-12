import PropTypes from 'prop-types'
// import {
//   AiFillEye
// } from 'react-icons/ai'
// import {
//   BsTrashFill
// } from 'react-icons/bs'
// import {BiEdit} from 'react-icons/bi'
// eslint-disable-next-line react/prop-types
export const ListBookRows = ({ head=[], body =[] }) => {
  //obtengo el id y la opcion que se selecciono (borrar,mostrar y editar)
  return (
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
            body.map((b,i)=>(
                (i%2 === 1)
                ?
              <tr className= 'py-3 bg-custom-grey text-center h-12' key={i}>
                <th className='py-2'>{b.titulo}</th>
                <th>{b.id}</th>
                <th>{b.detalle_ventas.cantidad}</th>
                <th>{b.precio}</th>
                <th>{b.detalle_ventas.descuento}</th>
                <th>{b.detalle_ventas.importe}</th>
              </tr>
            :
            <tr className= 'py-3 bg-white pt-2 pb-2 text-center' key={i}>
                <th>{b.titulo}</th>
                <th>{b.id}</th>
                <th>{b.detalle_ventas.cantidad}</th>
                <th>{b.precio}</th>
                <th>{b.detalle_ventas.descuento}</th>
                <th>{b.detalle_ventas.importe}</th>
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
}