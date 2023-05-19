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

const PrintBet = (prop) => {
  var item = prop.item;
  var i = prop.i;
  var user = prop.user;
  var users = prop.users;
  var _s =
    item.username == user.username
      ? { marginTop: i * -3, marginLeft: i * 3 }
      : {
          marginTop: i * -3,
          marginLeft: i * -3,
          transform: "scale(.5)",
        };

  var _c = "animate__bounceIn animate__animated ";

  if (item.win == 0) {
    _c = "animate__fadeOut animate__animated animate__delay-1s";
  }
  if (item.win >= 1) {
    _c =
      "animate__heartBeat animate__animated animate__slower animate__infinite";
  }
  return (
    <div key={i + "-" + prop.chip}>
      <GetChip {...prop} style={_s} className={_c} />
    </div>
  );
};
const getChipsCount = (item, users, user) => {
  var bet = item.bet;
  var count50 = bet / 50;
  var bets = [];
  count50 = parseInt(count50);

  for (let i = 0; i < count50; i++) {
    bets.push(50);
  }
  bet = bet - count50 * 50;

  var count25 = bet / 25;
  count25 = parseInt(count25);
  for (let i = 0; i < count25; i++) {
    bets.push(25);
  }
  bet = bet - count25 * 25;
  var count10 = bet / 10;
  count10 = parseInt(count10);
  for (let i = 0; i < count10; i++) {
    bets.push(10);
  }

  bet = bet - count10 * 10;
  var count5 = bet / 5;
  count5 = parseInt(count5);
  for (let i = 0; i < count5; i++) {
    bets.push(5);
  }

  bet = bet - count5 * 5;
  var count1 = bet / 1;
  count1 = parseInt(count1);
  for (let i = 0; i < count1; i++) {
    bets.push(1);
  }
  return bets.map((chip, i) => {
    return (
      <PrintBet
        key={i}
        i={i}
        chip={chip}
        item={item}
        users={users}
        user={user}
      />
    );
  });
};

function MNyWheel(prop) {
  const bets = localStorage.getItem("lastbet")
    ? JSON.parse(localStorage.getItem("lastbet"))
    : [];

  const [balance, setBalance] = useState(0);

  const [wheel, setWheel] = useState({});
  const [user, setUser] = useState(socket.auth);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
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

        <ShowWheel />
      </div>
      <BetsWheel {...prop} user={user} wheel={wheel} />
      <ChipsWheel {...prop} user={user} />

      <Mod id={user?._id} />
    </>
  );
}

export default MNyWheel;
