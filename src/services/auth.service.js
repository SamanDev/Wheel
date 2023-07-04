import axios from "axios";

const API_URL2 =
  process.env.NODE_ENV === "production"
    ? "https://api.wheelofpersia.com/api/auth/"
    : "http://localhost:8085/api/auth/";
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wheelofpersia.com/api/auth/"
    : "https://api.wheelofpersia.com/api/auth/";

const register = (username, email, password, image, refer) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    image,
    refer,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("guser");
};

export default {
  register,
  login,
  logout,
};
