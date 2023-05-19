import React, { useState, useEffect } from "react";

import Mywhell from "../Wheel";
import { socket } from "../socket";

import { Button, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import EventBus from "../common/EventBus";
const BoardUser = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [wheel, setWheel] = useState({});

  const [userDC, setUserDC] = useState(false);
  useEffect(() => {
    if (!user?.accessToken) {
      window.location.href = "/";
    }
  }, []);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
    EventBus.on("disconnect", (data) => {
      setUserDC(true);
    });
    EventBus.on("connect", (data) => {
      setUserDC(false);
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
  return <Mywhell user={user} wheel={wheel} />;
};

export default BoardUser;
