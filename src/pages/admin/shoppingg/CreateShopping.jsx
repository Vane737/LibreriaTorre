import { FormDynamicCompra } from '../../../components/Form/FormDynamicCompra'

export const CreateShopping = () => {
  return (
    <div className="w-full h-screen p-10">
      <h2 className="text-2xl font-bold">Compra</h2>
      <div className="mt-10">
        <FormDynamicCompra/>
      </div>
    </div>
  )
}
