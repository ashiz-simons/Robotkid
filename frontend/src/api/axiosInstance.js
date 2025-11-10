import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Add /api here
});

export default API;
