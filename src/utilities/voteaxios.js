import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://etechpolltesting.onrender.com/",
  headers: {
    access_token: localStorage.getItem("token"),
  },
});

export default axiosInstance;
