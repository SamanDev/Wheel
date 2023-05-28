import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";
import { Button, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Jetton, UsersIcon } from "../utils/include";

function BetsWheel(prop) {
  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(prop.user);
  const [online, setOnline] = useState(1);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    EventBus.on("user", (data) => {
      setUser(data);
    });
    EventBus.on("balance", (data) => {
      const userOld = JSON.parse(localStorage.getItem("user"));
      var _user = userOld;
      _user.balance2 = data;

      setUser(_user);
    });
    EventBus.on("online", (data) => {
      setOnline(data);
    });
  }, []);

  useEffect(() => {
    const userOld = JSON.parse(localStorage.getItem("user"));
    var _new = user;
    _new.accessToken = userOld.accessToken;
    _new.id = userOld.id;
    localStorage.setItem("user", JSON.stringify(_new));
  }, [user]);

  return (
    <>
      <div className="info">
        <b>{user?.username}</b>
        <div style={{ float: "right" }}>
          <span>{online}</span>{" "}
          <span>
            {" "}
            <UsersIcon
              colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
              style={{ width: 25, height: 25 }}
            />
          </span>
          <span>
            <Jetton />
          </span>{" "}
          <span> {user?.balance2}</span>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default BetsWheel;
