import { FormDynamicVentaEmployee } from '../../../components/Form/FormDynamicVentaEmployee'

export const CreateSaleEmployee = () => {
  return (
    <div className="w-full h-screen p-10">
      <h2 className="text-2xl font-bold">VENTA</h2>
      <div className="mt-10">
        {/* <FormDynamicVenta/> */}
        <FormDynamicVentaEmployee/>
      </div>
    </div>
  )
}
