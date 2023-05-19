import React, { useState, useEffect } from "react";

import Mywhell from "../Wheel";
import { socket } from "../socket";

import { Button, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import EventBus from "../common/EventBus";
const BoardUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user?.accessToken) {
      window.location.href = "/";
    }
  }, []);

  const [userDC, setUserDC] = useState(false);
  useEffect(() => {
    EventBus.on("disconnect", (data) => {
      setUserDC(true);
    });
    EventBus.on("connect", (data) => {
      setUserDC(false);
    });
  }, []);
  if (userDC) {
    return (
      <Segment className="loadarea">
        <Dimmer active>
          <Loader size="massive">Connection lost</Loader>
        </Dimmer>
      </Segment>
    );
  }
  return <Mywhell currentUser={user} />;
};

export default BoardUser;
