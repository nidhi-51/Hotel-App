import axios from "axios";

const API = axios.create({
  baseURL: "https://demohotelsapi.pythonanywhere.com/",
});

export default API;