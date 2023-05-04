import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "https://api.charkheshans.com/wheel";

const user = JSON.parse(localStorage.getItem("user"));

export const socket = io(URL, {
  auth: user,
  autoConnect: false,
});
