import Logo from '../../assets/img/logo.png'
import {Outlet} from 'react-router-dom'


export const HeaderNavigation = () => {
  return (
    <>
      <header className='bg-custom-celeste flex p-3 h-36' >
        <nav>
          <img className='h-28 w-auto' src={Logo} alt="Logo-Libreria" />
        </nav>
      </header>  
      <Outlet/>  
    </>
  )
}

