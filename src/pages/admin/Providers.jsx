import { useNavigate } from "react-router-dom";



export const Providers = () => {

  const datos = [
    { id: 1, nombre: "Juan Perez Ledezma", email: "juan@gmail.com", direccion: "Villa primero de mayo", telefono: "65465498712" },
    { id: 2, nombre: "Pedro  Lada", email: "pedro@gmail.com", direccion: "San martin", telefono: "3324558696" },
    { id: 3, nombre: "Alexander Vazques", email: "Alex@gmail.com", direccion: "Pampa de la isla", telefono: "3324558696" },
    { id: 4, nombre: "Ludez Manzano", email: "Lurdez@gmail.com", direccion: "Urubo norte", telefono: "3324558696" }
  ]
  const navigate = useNavigate();
  // const { listData, loading } = useListDatas("/venta");
  // const head = [
  //   "id",
  //   "fecha",
  //   "hora",
  //   "total",
  //   "tipo pago",
  //   "cliente",
  //   "vendedor",
  // ];

  // const handleClickOption = ({ id, option }) => {
  //   switch (option) {
  //     case "borrar":
  //       return "Hola mundo";
  //     case "vista":
  //       return navigate(`/admin/user/read/${id}`);
  //     case "editar":
  //       return navigate(`/admin/user/edit/${id}`);
  //     default:
  //       break;
  //   }
  // };

  const handleClickCreate = () => {
    navigate("/admin/sale/create");
  };

  return (
    <div className="w-full p-5">
      <div className="mt-5 p-5 w-full h-screen">
        <div className="flex justify-end pr-4">
          <button
            className="bg-custom-green rounded-md p-1 font-semibold pr-4 pl-4 text-white"
            onClick={handleClickCreate}
          >
            Crear Nota de Venta
          </button>
        </div>

        <div className="pt-5">
          <div>
            <table className="table-fixed w-full">
              <thead className="bg-custom-celeste w-full">
                <tr className="">
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* {datos.map((provedor, index) => {
                    return(
                     <th key={index}>provedor.id</th> 
                    );
                  })} */}
                  <th className="p-2">
                    <button className="rounded-md p-2 text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button className="bg-custom-grey rounded-md p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </th>
                </tr>
                {/* <tr className="bg-custom-grey">
                  <th className="pb-2 pt-2">asdsafa</th>
                  <th>asdfafa</th>
                  <th>gadsgfas</th>
                  <th>fgasagasa</th>
                  <th>safafasf</th>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
