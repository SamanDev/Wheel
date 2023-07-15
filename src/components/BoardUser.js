import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Mywhell from "../MyWheel";
import EventBus from "../common/EventBus";
import socket from "../socket";
import socketpub from "../socketpub";
import { useBets, useUser } from "../hooks/user.hooks";
const BoardUser = (prop) => {
  const [userDC, setUserDC] = useState(false);

  return (
    <div className="home wheel">
      <div className="cadr">
        <Mywhell {...prop} />
      </div>
    </div>
  );
};

export default BoardUser;
