import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.charkheshans.com/api/test/"
    : "http://localhost:8080/api/test/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getchips = (id) => {
  return axios.get("http://localhost:8080/getchip?id=" + id, {
    headers: authHeader(),
  });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getchips,
};
