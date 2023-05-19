import { io } from "socket.io-client";
import EventBus from "./common/EventBus";
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.charkheshans.com/wheel"
    : "http://sock.charkheshans.com/wheel";

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export var socket = io(URL, {
  auth: getToken(),
  autoConnect: true,
});
function onConnect() {
  EventBus.dispatch("connect");
  socket.emit("getwheel");
  socket.on("msg", ({ command, data }) => {
    if (command == "update") {
      // setWheel(data);
      EventBus.dispatch("wheel", data);
    }
    if (command == "users") {
      EventBus.dispatch("users", data);
    }
    if (command == "bets") {
      EventBus.dispatch("bets", data);
    }
    if (command == "resetusers") {
      EventBus.dispatch("resetusers");
    }
    if (command == "user") {
      EventBus.dispatch("user", data);
    }
    if (command == "online") {
      EventBus.dispatch("online", data);
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
