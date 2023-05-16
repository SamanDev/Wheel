import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Mywhell from "../Wheel";
import { socket } from "../socket";
const BoardUser = () => {
  const [content, setContent] = useState("");

  var user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
    socket.emit("getwheel");
  }, []);
  return <Mywhell currentUser={user} wheel={content} />;
};

export default BoardUser;
