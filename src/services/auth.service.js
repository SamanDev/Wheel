import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.charkheshans.com/api/auth/"
    : "http://api.charkheshans.com/api/auth/";

const register = (username, email, password, image) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    image,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

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
