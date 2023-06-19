import React, { useState, useEffect } from "react";

import Mywhell from "../MyWheel";

import { Segment, Dimmer, Icon, Header, Button } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import socket from "../socket";
const BoardUser = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [userDC, setUserDC] = useState(false);
  useEffect(() => {
    if (!user?.accessToken) {
      window.location.href = "/";
    } else {
      socket.auth = user;
      socket.connect();
    }

    return () => {
      //setUserDC(true);
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    EventBus.on("disconnect", (data) => {
      setUserDC(true);
    });
    EventBus.on("connect", (data) => {
      setUserDC(false);
    });
    return () => {
      EventBus.remove("disconnect");
    };
  }, []);
  if (userDC || !user?.accessToken) {
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
  return (
    <div className="home wheel">
      <div className="cadr">
        <Mywhell />
      </div>
    </div>
  );
};

export default BoardUser;
