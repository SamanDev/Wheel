import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";
import { useBets, useUser } from "../hooks/user.hooks";
function BetsWheel(prop) {
  const wheel = prop.wheel;
  const user = prop.user;
  const [balance, setBalance] = useState(user?.balance2);
  useEffect(() => {
    setBalance(user?.balance2);
  }, [user?.balance2]);
  useEffect(() => {
    EventBus.on("balance", (data) => {
      try {
        var newuser = JSON.parse(localStorage.getItem("user"));

        newuser.balance2 = data;
        localStorage.setItem("user", JSON.stringify(newuser));
        setBalance(data);
      } catch (error) {
        setBalance(0);
      }
    });
    return () => {
      EventBus.remove("balance");
    };
  }, []);
  useEffect(() => {
    var bet = prop.bet;
    var nextbet = bet;

    if (nextbet >= balance) {
      nextbet = 5000;
    }
    if (nextbet >= balance) {
      nextbet = 1000;
    }
    if (nextbet >= balance) {
      nextbet = 500;
    }
    if (nextbet >= balance) {
      nextbet = 250;
    }
    if (nextbet >= balance) {
      nextbet = 50;
    }
    if (nextbet != bet) {
      prop.setBet(nextbet);
    }
  }, [balance]);
  return (
    <div
      style={wheel?.status != "Pending" ? { opacity: 0.5 } : { opacity: 1 }}
      className="chipps"
    >
      <div className="chiparea">
        <div style={balance >= 50 ? {} : { opacity: 0.5 }}>
          <GetChip chip={50} {...prop} />
        </div>
        <div style={balance >= 250 ? {} : { opacity: 0.5 }}>
          <GetChip chip={250} {...prop} />
        </div>
        <div style={balance >= 500 ? {} : { opacity: 0.5 }}>
          <GetChip chip={500} {...prop} />
        </div>
        <div style={balance >= 1000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={1000} {...prop} />
        </div>
        <div style={balance >= 5000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={5000} {...prop} />
        </div>
      </div>
    </div>
  );
}

export default BetsWheel;
