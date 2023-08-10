import { useListDatasUsers } from "../../hook";
import { CardBook } from "../../components/CardBook";

export const ListBooksClient = () => {
  const { listData, loading } = useListDatasUsers("/libro/cliente");

  return (
    <section className="w-full bg-white">
      <div className="mt-5 p-5 w-full h-screen">
        <h1 className="text-2xl font-bold mb-3">LIBROS DISPONIBLES</h1>
        <hr className="mb-6"/>
        <div className="grid grid-cols-4 ">
          {loading ? (
            <p>Cargando libros...</p>
          ) : (
            listData.libros.map((book, i) => {
              return (
                <div className="text-center" key={i}>
                  <CardBook book={book} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
