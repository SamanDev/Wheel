import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.charkheshans.com/wheel"
    : "http://localhost:8484/wheel";

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export var socket = io(URL, {
  auth: getToken(),
  autoConnect: false,
});
