import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";

function BetsWheel(prop) {
  const oldduser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(oldduser);
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
  const [balance, setBalance] = useState(oldduser?.balance2);
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
      var newuser = oldduser;
      newuser.balance2 = data;
      localStorage.setItem("user", JSON.stringify(newuser));
      setBalance(data);
      setUser(newuser);
    });
    return () => {
      EventBus.remove("user");
      EventBus.remove("balance");
      EventBus.remove("wheel");
    };
  }, []);
  useEffect(() => {
    var bet = prop.bet;
    var nextbet = bet;

    if (nextbet > balance) {
      nextbet = 5000;
    }
    if (nextbet > balance) {
      nextbet = 1000;
    }
    if (nextbet > balance) {
      nextbet = 500;
    }
    if (nextbet > balance) {
      nextbet = 250;
    }
    if (nextbet > balance) {
      nextbet = 50;
    }
    if (nextbet != bet) {
      prop.setBet(nextbet);
    }
  }, [balance]);
  return (
    <div
      className={
        wheel?.status != "Pending"
          ? " animate__animated animate__backOutRight"
          : " animate__animated animate__backInRight"
      }
    >
      {" "}
      <div className="chiparea">
        <div style={user?.balance2 >= 50 ? {} : { opacity: 0.5 }}>
          <GetChip chip={50} {...prop} />
        </div>
        <div style={user?.balance2 >= 250 ? {} : { opacity: 0.5 }}>
          <GetChip chip={250} {...prop} />
        </div>
        <div style={user?.balance2 >= 500 ? {} : { opacity: 0.5 }}>
          <GetChip chip={500} {...prop} />
        </div>
        <div style={user?.balance2 >= 1000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={1000} {...prop} />
        </div>
        <div style={user?.balance2 >= 5000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={5000} {...prop} />
        </div>
      </div>
    </div>
  );
}

export default BetsWheel;
