import axios from "axios";

const api = axios.create({
  baseURL: "https://explorer-api-teal.vercel.app/api",
});



export default api
