import PropTypes from 'prop-types'


export const FormModal = ({estados, Text }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-1/3 p-5 rounded-2xl flex flex-col justify-center items-center gap-4">
        <form >
          <div>
            <label htmlFor=""></label>
            <input type="email" name="" id="" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="password" name="" id="" />
          </div>
          <input type="submit" value="Aceptar" />
          <input type="submit" value="Cancelar" />
        </form>
      </div>
    </div>
  )
}

FormModal.proptypes = {
  estados: PropTypes.func.isRequired,
  Text: PropTypes.string.isRequired
}
