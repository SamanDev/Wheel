import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import EventBus from "./common/EventBus";
import Mod from "./modalads";
import Modalwin from "./wheel/modal";
import ShowWheel from "./wheel/wheel";
import BottomWheel from "./wheel/bottom";
import InfoWheel from "./wheel/info";

import { socket } from "./socket";

function MNyWheel(prop) {
  const bets = localStorage.getItem("lastbet")
    ? JSON.parse(localStorage.getItem("lastbet"))
    : [];

  const [balance, setBalance] = useState(1000);

  const [wheel, setWheel] = useState({});
  const [user, setUser] = useState(socket.auth);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
    EventBus.on("user", (data) => {
      setUser(data);
    });

    EventBus.on("setuser", (data) => {
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
        EventBus.dispatch("user", data);
      } else {
        const userOld = JSON.parse(localStorage.getItem("user"));
        var _user = data;
        _user.accessToken = userOld.accessToken;
        _user.id = userOld.id;
        _user._id = userOld.id;
        localStorage.setItem("user", JSON.stringify(_user));

        EventBus.dispatch("user", _user);
      }
    });
    EventBus.on("balance", (data) => {
      const userOld = JSON.parse(localStorage.getItem("user"));
      var _user = userOld;
      _user.balance2 = data;

      setUser(_user);
    });
  }, []);
  useEffect(() => {
    setBalance(user?.balance2);
  }, [user?.balance2]);
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

  if (user == "") {
    return (
      <Segment className="loadarea">
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }

  return (
    <>
      <InfoWheel {...prop} user={user} wheel={wheel} />

      <div
        className={
          wheel?.status == "Spin"
            ? "mainwheel mywhell mytrue"
            : "mainwheel mywhell"
        }
      >
        <ShowWheel wheel={wheel} />
      </div>

      <BottomWheel {...prop} user={user} wheel={wheel} />
      <Modalwin {...prop} user={user} wheel={wheel} />
      <Mod id={user?._id} />
    </>
  );
}

export default MNyWheel;
