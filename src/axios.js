import axios from "axios";

const instance = axios.create({
  baseURL: "https://tinder-backend-0.herokuapp.com",
});

export default instance;
