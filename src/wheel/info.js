import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import { Jetton, UsersIcon } from "../utils/include";

function BetsWheel(prop) {
  const [user, setUser] = useState(prop.user);
  const [online, setOnline] = useState(1);
  const [balance, setBalance] = useState(user?.balance2);
  useEffect(() => {
    EventBus.on("user", (data) => {
      setUser(data);
      setBalance(data.balance2);
    });
    EventBus.on("balance", (data) => {
      setBalance(data);
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
  }, [user.balance2]);

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
          <span> {balance}</span>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default BetsWheel;
