import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import GetChip from "./getChips";
import EventBus from "./common/EventBus";
import $ from "jquery";
import Mod from "./modalads";
import CountWheel from "./wheel/count";
import ShowWheel from "./wheel/wheel";
import BetsWheel from "./wheel/bets";
import ChipsWheel from "./wheel/chips";
import InfoWheel from "./wheel/info";
import { useDispatch, useSelector } from "react-redux";
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
    EventBus.on("balance", (data) => {
      const userOld = JSON.parse(localStorage.getItem("user"));
      var _user = userOld;
      _user.balance2 = data;
      console.log(_user);
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
      nextbet = 50;
    }
    if (nextbet > balance) {
      nextbet = 25;
    }
    if (nextbet > balance) {
      nextbet = 10;
    }
    if (nextbet > balance) {
      nextbet = 5;
    }
    if (nextbet > balance) {
      nextbet = 1;
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
        <CountWheel {...prop} wheel={wheel} />

        <ShowWheel wheel={wheel} />
      </div>
      <BetsWheel {...prop} user={user} wheel={wheel} />
      <ChipsWheel {...prop} user={user} />

      <Mod id={user?._id} />
    </>
  );
}

export default MNyWheel;
