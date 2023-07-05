import {
  useParams
} from 'react-router-dom'
export const EditUser = () => {
  const params = useParams();
  console.log(params);
  return (
    <div className="w-full h-screen">DeleteUser</div>
  )
}
