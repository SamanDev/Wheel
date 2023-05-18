import React, { useState, useEffect } from "react";

import Mywhell from "../Wheel";
import { socket } from "../socket";
const BoardUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user?.accessToken) {
      window.location.href = "/";
    }
    socket.emit("getwheel");
  }, []);
  return <Mywhell currentUser={user} />;
};

export default BoardUser;
