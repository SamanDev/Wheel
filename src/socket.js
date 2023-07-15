import { io } from "socket.io-client";
import EventBus from "./common/EventBus";
// "undefined" means the URL will be computed from the `window.location` object
const URL2 =
  process.env.NODE_ENV === "production"
    ? "https://sock.wheelofpersia.com/wheel"
    : "http://localhost:8484/wheel";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.wheelofpersia.com/wheel"
    : "https://sock.wheelofpersia.com/wheel";

const socket = io(URL, {
  autoConnect: false,
});
function onConnect() {
  socket.on("msg", ({ command, data }) => {
    console.log(command, data);
    if (command == "user") {
      EventBus.dispatch("user", data);
    }

    if (command == "setuser") {
      EventBus.dispatch("connect", true);
      EventBus.dispatch("setuser", data);
    }

    if (command == "disconnect") {
      socket.disconnect();
    }
  });
}
function onDisConnect() {
  EventBus.dispatch("disconnect");
}
socket.on("connect", onConnect);
socket.on("disconnect", onDisConnect);
export default socket;
