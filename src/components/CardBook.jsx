/* eslint-disable react/prop-types */
import DefaultImage from '../assets/img/default.jpg'


export const CardBook = ( { book } ) => {
    
    return (
    <>
      <div className='p-3'>
          <img className='h-28 w-auto mx-auto my-auto' src={book.img? book.img : DefaultImage } alt="Logo-Libreria" />
          <p className='font-bold'>{book.titulo}</p>
          <p>{book.precio} Bs</p>
          <p>Disponibles: {book.inventario.cantidad} Unidad(es)</p>
      </div>    
    </>
  );
}

