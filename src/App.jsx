import {
  LoginForm
} from './pages/auth'

import {
  ListUsers,
  ListBooks,
  EditUser,
  StarPage,
  ReadUser,
  EditBook,
  ReadBook,
  ListSales,
  CreateSale
} from './pages/admin'



import {
  HeaderNavigation,
  SideBarMenu
} from './components/navigation'

import {
  useRoutes,
  Navigate
} from 'react-router-dom'
import { Providers } from './pages/admin/Providers'
import { Shoppings } from './pages/admin/Shoppings'

import CreateEditProdiver from './pages/admin/providerr/CreateEditProvider'

import { ReadProdiver } from './pages/admin/providerr/ReadProvider';
import { ReadSale } from './pages/admin/sales/ReadSale'
import { CreateShopping } from './pages/admin/shoppingg/CreateShopping'



function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <HeaderNavigation/>,
      children: [
        {
          path: "/",
          element: <Navigate to="/login"/>
        },
        {
          path: "login",
          element: <LoginForm/>
        },
        {
          path: "admin",
          element: <SideBarMenu/>,
          children: [
            {
              path: "/admin",
              element: <Navigate to="/admin/home" />
            },
            {
              path: "home",
              element: <StarPage/>
            },
            {
              path: "users",
              element: <ListUsers/>,
            },
            {
              path: "books",
              element: <ListBooks/>
            },
            {
              path: "providers",
              element: <Providers />
            },
            {
              path: "shoppings",
              element: <Shoppings />
            },
            {
              path: "user",
              children: [
                {
                  path: "/admin/user",
                  element: <Navigate to='/admin'/>
                },
                {
                  path: "edit/:id",
                  element: <EditUser/>
                },
                {
                  path: "read/:id",
                  element: <ReadUser/>
                }
              ]
            },
            {
              path: 'book',
              children: [
                {
                  path: '/admin/book',
                  element: <Navigate to='/admin'/>
                },
                {
                  path: 'edit/:id',
                  element: <EditBook/>
                },
                {
                  path: 'read/:id',
                  element: <ReadBook/>
                }
              ]
            },
            {
              path: 'shopping',
              children: [
                {
                  path: '/admin/shopping',
                  element: <Navigate to='/admin'/>
                },
                {
                  path: 'edit/:id',
                  element: <EditBook/>
                },
                {
                  path: 'read/:id',
                  element: <ReadBook/>
                },
                {
                  path: 'create',
                  element: <CreateShopping/>
                }
              ]
            },
            {
              path: 'provider',
              children: [
                {
                  path: '/admin/provider',
                  element: <Navigate to='/admin'/>
                },
                {
                  path: 'create',
                  element: <CreateEditProdiver/>
                },
                {
                  path: 'edit/:id',
                  element: <CreateEditProdiver/>
                },
                {
                  path: 'read/:id',
                  element: <ReadProdiver/>
                }
              ]
            },
            {
              path: 'sales',
              element: <ListSales/>, 
            },
            {
              path: 'sale',
              children: [
                {
                  path:'/admin/sale',
                  element:<Navigate to='/admin'/>
                },
                {
                  path: 'create',
                  element: <CreateSale/>
                },
                {
                  path: 'read/:id',
                  element: <ReadSale/>
                },
              ]
            }
          ]
        },
      ]
    }
  ])
  return(
    <>
      {element}
    </>
  )
}

export default App
