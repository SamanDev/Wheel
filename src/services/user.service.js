import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wheelofpersia.com/"
    : "http://localhost:8085/";
/* const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wheelofpersia.com/"
    : "https://api.wheelofpersia.com/"; */
const getPublicContent = () => {
  return axios.get(API_URL + "api/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "api/user", { headers: authHeader() });
};
const getchips = (id) => {
  return axios.get(API_URL + "getchip", {
    headers: authHeader(),
  });
};
const addChat = (data) => {
  return axios.post(API_URL + "addchat", data, {
    headers: authHeader(),
  });
};
const addBet = (data) => {
  return axios.post(API_URL + "addbet", data, {
    headers: authHeader(),
  });
};
const gettokens = (id) => {
  return axios.get(API_URL + "gettokens?id=" + id, {
    headers: authHeader(),
  });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "api/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "api/admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getchips,
  gettokens,
  addChat,
  addBet,
};
