import { io } from "socket.io-client";
import EventBus from "./common/EventBus";
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sock.wheelofpersia.com/wheel"
    : "http://sock.wheelofpersia.com/wheel";

const socket = io(URL, {
  autoConnect: false,
});
function onConnect() {
  EventBus.dispatch("connect", true);
  socket.on("msg", ({ command, data }) => {
    if (command == "update") {
      localStorage.setItem("wheel", JSON.stringify(data));
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
    if (command == "setuser") {
      EventBus.dispatch("setuser", data);
    }

    if (command == "online") {
      EventBus.dispatch("online", data);
    }
    if (command == "chat") {
      EventBus.dispatch("chat", data);
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
