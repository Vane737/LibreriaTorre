import { useNavigate } from "react-router-dom";

export const Providers = () => {
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
                  <th>Libro</th>
                  <th>Id</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Precio Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-custom-grey">
                  <th className="pb-2 pt-2">asdsafa</th>
                  <th>asdfafa</th>
                  <th>gadsgfas</th>
                  <th>fgasagasa</th>
                  <th>safafasf</th>
                  <th className="p-2">
                    <button className="bg-custom-red rounded-md p-2">
                      Eliminar
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
