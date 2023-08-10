import {FormDynamicCreate} from '../../components/Form';
import {useNavigate } from 'react-router-dom'
import axios from '../../API/axios'
import { useState } from 'react';
import api from '../../API/axios';
// import { MyModal } from '../../components/utils';
import { MyModalMessage } from '../../components/utils/MyModalMessage';

export const LoginForm = () => {
  //navega las rutas distinstas
  const navigate = useNavigate();
  const [ message, setMessage ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  //inicializar valores
  const initialValues = {
    email: '',
    password: ''
  }

  let usuario = null;
  //datos para el formulario
  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password'},
  ];      
  const button = 'Iniciar Sesion'
  
  const handleUser = () => {
      const fetchUser = async () => {
      try {
          const token = localStorage.getItem("x-token");
          const response = await api.get('/usuario/token', {
              headers: {
                  "x-token": token
              }
          })
          .then((response)=>{
            usuario = response.data.usuario;

            switch (usuario.role.nombre) {
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
          });
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
      // navigate('/admin/users')
    } catch (error) {
      if (error.response.data.errores) {
        if (error.response.data.errores.errors.length < 2) {
          console.log(error.response.data.errores.errors[0].msg);
          setMessage(error.response.data.errores.errors[0].msg);
        } else {
          console.log("Datos ingresados incorrectos");
          setMessage("Datos ingresados incorrectos");
        }
        } else {
          console.log(error.response.data.msg);
          setMessage(error.response.data.msg);
        }
      setIsOpen(true);
    }
  }
  
  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
    }
  };

  return (
      <section className="flex items-center justify-center h-screen">
        <div className=" bg-custom-celeste flex flex-col w-1/3 rounded-xl">
          <h2 className="font-bold text-3xl text-center p-4">Iniciar Sesion</h2>
          <div className="flex flex-col pr-5 pl-5">
            <FormDynamicCreate fields={fields}  initialValues={initialValues} button={button} getValues={handleSubmit}/>
          </div>
        </div>
        {isOpen && <MyModalMessage Text={message} estados={closeModal} />}
      </section>
  )
}

