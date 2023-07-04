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
    if (currentUser?.accessToken) {
      socket.auth = currentUser;
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [currentUser?.accessToken]);
  useEffect(() => {
    socketpub.connect();

    EventBus.on("disconnect", (data) => {
      socket.disconnect();
      socketpub.disconnect();
    });

    return () => {
      EventBus.remove("disconnect");
    };
  }, []);

  return (
    <div className="home wheel">
      <div className="cadr">
        <Mywhell />
      </div>
    </div>
  );
};

export default BoardUser;
