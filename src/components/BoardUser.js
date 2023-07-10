import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mywhell from "../MyWheel";
import Google from "../google";
import { Segment, Dimmer, Icon, Header, Button } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import socket from "../socket";
import socketpub from "../socketpub";
const BoardUser = () => {
  const [userDC, setUserDC] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    socketpub.connect();

    EventBus.on("connectpub", (data) => {
      if (data?.accessToken && !socket.auth) {
        socket.auth = data;
        socket.connect();
      } else {
        //socket.disconnect();
      }
    });
    EventBus.on("disconnect", (data) => {
      socket.disconnect();
      socketpub.disconnect();
    });

    return () => {
      EventBus.remove("connectpub");
      EventBus.remove("disconnect");
    };
  }, []);
  useEffect(() => {
    EventBus.dispatch("connectpub", currentUser);
  }, [currentUser?.accessToken]);
  return (
    <div className="home wheel">
      <div className="cadr">
        <Mywhell />
      </div>
    </div>
  );
};

export default BoardUser;
