import {
  LoginForm
} from './pages/auth'

import {
  ListUsers,
  ListBooks,
  StarPage,
  ReadUser,
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
import { ListShoppings } from './pages/admin/ListShoppings'

import CreateEditProdiver from './pages/admin/providerr/CreateEditProvider'

import { ReadProdiver } from './pages/admin/providerr/ReadProvider';
import { ReadSale } from './pages/admin/sales/ReadSale'
import { CreateShopping } from './pages/admin/shoppingg/CreateShopping'
import { ReadShopping } from './pages/admin/shoppingg/ReadShopping'
// import { ListBookss } from './pages/uclient/ListBookss'
import CreateEditBook from './pages/admin/book/CreateEditBook'
import EditUser from './pages/admin/user/EditUser'
import CreateUser from './pages/admin/user/CreateUser'
import { ListProviders } from './pages/admin/ListProviders'
import { ListCategories } from './pages/admin/ListCategories'
import { ListRoles } from './pages/admin/ListRoles'
import CreateEditRol from './pages/admin/rol/CreateEditRol'
import CreateEditCategory from './pages/admin/categoria/CreateEditCategory'
import { ListSalesEmployee } from './pages/uemployee/ListSales'
import { CreateSaleEmployee } from './pages/uemployee/sales/CreateSale'
import { ReadSaleEmployee } from './pages/uemployee/sales/ReadSale'
import { ListBooksProvider } from './pages/uprovider/ListBooks'
import { ListBooksClient } from './pages/uclient/ListBookss'
import { ReadBookEmployee } from './pages/uemployee/book/ReadBook'
import { ListBooksEmployee } from './pages/uemployee/ListBooks'
import { ListBitacora } from './pages/admin/ListBitacora'
import { ReadBookProvider } from './pages/uprovider/book/ReadBookProvider'


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
              path: "bitacora",
              element: <ListBitacora/>,
            },
            {
              path: "categories",
              element: <ListCategories/>,
            },
            {
              path: "roles",
              element: <ListRoles/>,
            },
            {
              path: "books",
              element: <ListBooks/>
            },
            {
              path: "providers",
              element: <ListProviders />
            },
            {
              path: "shoppings",
              element: <ListShoppings />
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
                },
                {
                  path: "create",
                  element: <CreateUser/>
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
                  element: <CreateEditBook/>
                },
                {
                  path: 'read/:id',
                  element: <ReadBook/>
                },
                {
                  path: 'create',
                  element: <CreateEditBook/>
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
                  path: 'read/:id',
                  element: <ReadShopping/>
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
            },
            {
              path: 'rol',
              children: [
                {
                  path:'/admin/rol',
                  element:<Navigate to='/admin'/>
                },
                {
                  path: 'create',
                  element: <CreateEditRol/>
                },
                {
                  path: 'edit/:id',
                  element: <CreateEditRol/>
                },
              ]
            },
            {
              path: 'category',
              children: [
                {
                  path:'/admin/category',
                  element:<Navigate to='/admin'/>
                },
                {
                  path: 'create',
                  element: <CreateEditCategory/>
                },
                {
                  path: 'edit/:id',
                  element: <CreateEditCategory/>
                },
              ]
            },
          ]
        },
        {
          path: "employee",
          element: <SideBarMenu redirecTo='employee'/>,
          children: [
            {
              path: "/employee",
              element: <Navigate to="/employee/home" />
            },
            {
              path: "home",
              element: <StarPage/>
            },
            {
              path: "books",
              element: <ListBooksEmployee/>
            },
            {
              path: 'book',
              children: [
                {
                  path:'/employee/book',
                  element:<Navigate to='/employee'/>
                },
                {
                  path: 'read/:id',
                  element: <ReadBookEmployee/>
                },
              ]
            },
            {
              path: 'sales',
              element: <ListSalesEmployee/>, 
            },
            {
              path: 'sale',
              children: [
                {
                  path:'/employee/sale',
                  element:<Navigate to='/employee'/>
                },
                {
                  path: 'create',
                  element: <CreateSaleEmployee/>
                },
                {
                  path: 'read/:id',
                  element: <ReadSaleEmployee/>
                },
              ]
            },
          ]
        },
        {
          path: "client",
          element: <SideBarMenu redirecTo='client'/>,
          children: [
            {
              path: "/client",
              element: <Navigate to="/client/home" />
            },
            {
              path: "home",
              element: <StarPage/>
            },
            {
              path: "books",
              element: <ListBooksClient/>
            },
          ]
        },
        {
          path: "provider",
          element: <SideBarMenu redirecTo='provider'/>,
          children: [
            {
              path: "/provider",
              element: <Navigate to="/provider/home" />
            },
            {
              path: "home",
              element: <StarPage/>
            },
            {
              path: "books",
              element: <ListBooksProvider/>
            },
            {
              path: 'book',
              children: [
                {
                  path: 'read/:id',
                  element: <ReadBookProvider/>
                },
              ]
            },
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
