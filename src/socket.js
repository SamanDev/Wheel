import { io } from "socket.io-client";
import EventBus from "./common/EventBus";
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.wheelofpersia.com/wheel"
    : "http://localhost:8484/wheel";
/* const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.wheelofpersia.com/wheel"
    : "https://sock.wheelofpersia.com/wheel"; */

const socket = io(URL, {
  autoConnect: false,
});
function onConnect() {
  EventBus.dispatch("connect", true);

  socket.on("msg", ({ command, data }) => {
    if (command == "user") {
      EventBus.dispatch("user", data);
    }
    if (command == "bets") {
      EventBus.dispatch("bets", data);
    }
    if (command == "setuser") {
      EventBus.dispatch("setuser", data);
    }

    if (command == "disconnect") {
      socket.disconnect();
    }
  });
}
function onDisConnect() {
  EventBus.dispatch("logout");
}
socket.on("connect", onConnect);
socket.on("disconnect", onDisConnect);
export default socket;
