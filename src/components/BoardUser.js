import React, { useState, useEffect } from "react";

import Mywhell from "../Wheel";

import { Segment, Dimmer, Loader } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import { socket } from "../socket";
const BoardUser = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [userDC, setUserDC] = useState(false);
  useEffect(() => {
    if (!user?.accessToken) {
      window.location.href = "/";
    }
    socket.connect();
  }, []);
  useEffect(() => {
    EventBus.on("disconnect", (data) => {
      setUserDC(true);
    });
  }, []);
  if (userDC || !user?.accessToken) {
    return (
      <Segment className="loadarea">
        <Dimmer active>
          <Loader size="massive">Connection lost</Loader>
        </Dimmer>
      </Segment>
    );
  }
  return (
    <div className="home wheel">
      <div className="cadr">
        <Mywhell />
      </div>
    </div>
  );
};

export default BoardUser;
