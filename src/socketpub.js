import { io } from "socket.io-client";
import EventBus from "./common/EventBus";
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.wheelofpersia.com/wheelpub"
    : "http://localhost:8484/wheelpub";

const socketpub = io(URL, {
  autoConnect: false,
});
function onConnect() {
  socketpub.on("msg", ({ command, data }) => {
    if (command == "update") {
      localStorage.setItem("wheel", JSON.stringify(data));
      EventBus.dispatch("wheel", data);
    }
    if (command == "user") {
      EventBus.dispatch("user", data);
    }
    if (command == "setuser") {
      EventBus.dispatch("setuser", data);
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

    if (command == "online") {
      EventBus.dispatch("online", data);
    }

    if (command == "disconnect") {
      // socketpub.disconnect();
    }
  });
}
function onDisConnect() {
  EventBus.dispatch("disconnect");
}
socketpub.on("connect", onConnect);
socketpub.on("disconnect", onDisConnect);
export default socketpub;
