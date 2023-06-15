import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import { Icon } from "semantic-ui-react";
import { Jetton, UsersIcon, formatDollar } from "../utils/include";
import { Link } from "react-router-dom";
import Mod from "./modalinv";
import Modads from "./modalads";
import ModLeader from "./modalleader";
function BetsWheel(prop) {
  const oldduser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(oldduser);
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
    return () => {
      EventBus.remove("user");
      EventBus.remove("balance");
      EventBus.remove("online");
    };
  }, []);
  useEffect(() => {
    var newuser = oldduser;
    newuser.balance2 = balance;
    localStorage.setItem("user", JSON.stringify(newuser));
  }, [balance]);

  return (
    <>
      <div className="infobtn">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Icon
            name="arrow alternate circle left outline"
            color="grey"
            circular
            inverted
          />
        </Link>
        <br />
        <Mod />
        <br />
        <Modads />
        <br />
        <ModLeader />
      </div>
      <div className="info" style={{ marginLeft: 40 }}>
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
          <span>
            {" "}
            {balance == -1
              ? formatDollar(user?.balance2)
              : formatDollar(balance)}
          </span>
        </div>
        <div className="wheelstylee"></div>
      </div>
    </>
  );
}

export default BetsWheel;
