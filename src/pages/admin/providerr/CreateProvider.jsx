import { useState } from "react";

export default function CreateProdiver() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Datos del proveedor:", { nombre, email, direccion, telefono });
    setNombre("");
    setEmail("");
    setDireccion("");
    setTelefono("");
  };

  const handleCancel = () => {
    console.log("Creación de proveedor cancelada");
    setNombre("");
    setEmail("");
    setDireccion("");
    setTelefono("");
  };
  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        REGISTRAR PROVEEDOR
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 w-full">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="direccion" className="block mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={handleDireccionChange}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={handleTelefonoChange}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-custom-green rounded-md p-2 block w-full mb-4"
          >
            Registrar
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-custom-red rounded-md p-2 block w-full"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
