import {FormDynamicCreate} from '../../components/Form';
import {useNavigate } from 'react-router-dom'
import axios from '../../API/axios'
import { useState } from 'react';
import api from '../../API/axios';

export const LoginForm = () => {
  //navega las rutas distinstas
  const navigate = useNavigate();
  //inicializar valores
  const initialValues = {
    email: '',
    password: ''
  }
  //datos para el formulario
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password'},
  ];      
  const button = 'Iniciar Sesion'
  
  //obtener los datos del formulario
  const [user, setUser] = useState(null);

  const handleUser = () => {
      const fetchUser = async () => {
      try {
          const token = localStorage.getItem("x-token");
          const response = await api.get('/usuario/token', {
              headers: {
                  "x-token": token
              }
          });
          // console.log(response);
          console.log(response.data.usuario);
          setUser(response.data.usuario);
      } catch (error) {
          console.error(error);
      }
      };
      fetchUser();
  };

  const handleSubmit = async({email, password}) =>{
    try {
      const {data} = await axios.post('/auth/login', {correo: email,password}); 
      localStorage.setItem('x-token', data.token);
      handleUser();
      switch (user.role.nombre) {
        case 'Administrador':
            return navigate('/admin/home')
        case 'Empleado':
            return navigate('/employee/home')
        case 'Cliente':
            return navigate('/client/home') 
        case 'Proveedor':
            return navigate('/provider/home')
        default:
            break;
    }
      // navigate('/admin/users')
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
      <section className="flex items-center justify-center h-screen">
        <div className=" bg-custom-celeste flex flex-col w-1/3 rounded-xl">
          <h2 className="font-bold text-3xl text-center p-4">Iniciar Sesion</h2>
          <div className="flex flex-col pr-5 pl-5">
            <FormDynamicCreate fields={fields}  initialValues={initialValues} button={button} getValues={handleSubmit}/>
          </div>
        </div>
      </section>
  )
}

