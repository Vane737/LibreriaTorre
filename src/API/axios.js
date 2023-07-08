import axios  from "axios"

const api = axios.create({
  baseURL: 'https://si1libreria-production-6536.up.railway.app/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
export const convertToJSONString = (obj) => {
  return JSON.stringify(obj);
}
export default api;
