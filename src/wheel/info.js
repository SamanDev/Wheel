import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import { Icon } from "semantic-ui-react";
import { Jetton, UsersIcon, formatDollar } from "../utils/include";
import { Link } from "react-router-dom";
import Mod from "./modalinv";
import Modads from "./modalads";
import ModLeader from "./modalleader";
import ModMarket from "./modalmarket";
function BetsWheel(prop) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [online, setOnline] = useState("");
  const [balance, setBalance] = useState(user?.balance2);
  useEffect(() => {
    EventBus.on("balance", (data) => {
      setBalance(data);
    });
    EventBus.on("user", (data) => {
      setBalance(data?.balance2);
    });
    EventBus.on("online", (data) => {
      setOnline(data);
    });
    return () => {
      EventBus.remove("balance");
      EventBus.remove("online");
    };
  }, []);
  useEffect(() => {
    try {
      var oldduser = JSON.parse(localStorage.getItem("user"));
      var newuser = oldduser;
      newuser.balance2 = balance;
      localStorage.setItem("user", JSON.stringify(newuser));
    } catch (error) {}
  }, [balance]);

  if (!user?.accessToken) {
    return (
      <>
        <div
          className="infobtn"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 50 }}
        >
          <ModLeader />
          <br />
          <ModMarket />
        </div>
        <div className="info" style={{ marginLeft: 40 }}>
          <b>Login to Play</b>
          <div style={{ float: "right" }}>
            <span>{online}</span>{" "}
            <span>
              {" "}
              <UsersIcon
                colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
                style={{ width: 25, height: 25 }}
              />
            </span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="infobtn"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 50 }}
      >
        <span
          style={{ textDecoration: "none" }}
          onClick={() => {
            EventBus.dispatch("logout");
            window.location.href = "https://landing.wheelofpersia.com";
          }}
        >
          <Icon
            name="arrow alternate circle left outline"
            color="grey"
            circular
            inverted
          />
        </span>

        <br />
        <Mod />
        <br />
        <Modads />
        <br />
        <ModLeader />
        <br />
        <ModMarket />
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
      </div>
    </>
  );
}

export default BetsWheel;
