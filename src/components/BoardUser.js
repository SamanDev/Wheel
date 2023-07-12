import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Mywhell from "../MyWheel";
import EventBus from "../common/EventBus";
import socket from "../socket";
import socketpub from "../socketpub";
import { useBets, useUser } from "../hooks/user.hooks";
const BoardUser = (prop) => {
  const [userDC, setUserDC] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    socketpub.connect();

    EventBus.on("connectpub", (data) => {
      if (data?.accessToken && !socket.auth?.accessToken) {
        socket.auth = data;

        socket.connect();
      } else {
        console.log(socket.auth);
        //socket.disconnect();
      }
    });
    EventBus.on("disconnect", (data) => {
      socket.disconnect();
      //socketpub.disconnect();
    });

    return () => {
      EventBus.remove("connectpub");
      EventBus.remove("disconnect");
    };
  }, []);
  useEffect(() => {
    if (currentUser?.accessToken) {
      EventBus.dispatch("connectpub", currentUser);
    }
  }, [currentUser?.accessToken]);
  return (
    <div className="home wheel">
      <div className="cadr">
        <Mywhell {...prop} />
      </div>
    </div>
  );
};

export default BoardUser;
