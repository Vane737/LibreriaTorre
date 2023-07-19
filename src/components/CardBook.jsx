/* eslint-disable react/prop-types */
import DefaultImage from '../assets/img/default.jpg'


export const CardBook = ( { book } ) => {
    
  console.log(book)

    return (
    <>
      <div className='' >
          <img className='h-28 w-auto mx-auto my-auto' src={book.img? book.img : DefaultImage } alt="Logo-Libreria" />
          <p>Titulo {book.titulo}</p>
          <p>{book.precio} Bs</p>
          <p>Disponibles: {book.inventario.cantidad} Unidad(es)</p>
      </div>    
    </>
  );
}

