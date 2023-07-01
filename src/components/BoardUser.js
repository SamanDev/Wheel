import React, { useState, useEffect } from "react";

import Mywhell from "../MyWheel";
import Google from "../google";
import { Segment, Dimmer, Icon, Header, Button } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import socket from "../socket";
const BoardUser = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [userDC, setUserDC] = useState(false);

  useEffect(() => {
    if (user?.accessToken) {
      socket.auth = user;
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [user?.accessToken]);
  useEffect(() => {
    EventBus.on("disconnect", (data) => {
      localStorage.removeItem("user");
      localStorage.removeItem("users");
      localStorage.removeItem("guser");
      localStorage.removeItem("wheel");
      setUserDC(true);
    });
    EventBus.on("connect", (data) => {
      if (userDC) {
        window.location.href = "/play";
      }
      setUserDC(false);
    });
    return () => {
      EventBus.remove("disconnect");
    };
  }, []);
  if (userDC) {
    return (
      <Dimmer active className="loadarea" style={{ paddingTop: "10%" }}>
        <Header as="h2" icon inverted>
          <Icon name="ban" color="red" />
          Connection lost!
        </Header>
        <br />
        <Button
          onClick={() => {
            window.location.reload();
          }}
          color="orange"
        >
          Reconnect
        </Button>
      </Dimmer>
    );
  }
  if (!user?.accessToken) {
    return (
      <Dimmer active className="loadarea" style={{ paddingTop: "10%" }}>
        <Header as="h2" icon inverted>
          <Icon name="user" color="grey" />
          Login with your Google account.
        </Header>
        <br />
        <Google />
      </Dimmer>
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
