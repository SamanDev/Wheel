import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";
import { Button, Label } from "semantic-ui-react";
import { socket } from "../socket";
import {
  segments,
  getcolor,
  getcolortext,
  segX,
  groupByMultipleFields,
  sumOfBet,
  sumOfWin,
} from "../utils/include";
import $ from "jquery";

const haveBet = (pos, list, user) => {
  return list
    .filter(
      (u) =>
        u.username == user.username && parseInt(u.position) == parseInt(pos)
      //s(u) => parseInt(u.position) == parseInt(pos)
    )
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((item, i) => {
      return getChipsCount(item, user);
    });
};
const getChipsCount = (item, user) => {
  var bet = item.bet;
  var count50 = bet / 5000;
  var bets = [];
  count50 = parseInt(count50);

  for (let i = 0; i < count50; i++) {
    bets.push(5000);
  }
  bet = bet - count50 * 5000;

  var count25 = bet / 1000;
  count25 = parseInt(count25);
  for (let i = 0; i < count25; i++) {
    bets.push(1000);
  }
  bet = bet - count25 * 1000;
  var count10 = bet / 500;
  count10 = parseInt(count10);
  for (let i = 0; i < count10; i++) {
    bets.push(500);
  }

  bet = bet - count10 * 500;
  var count5 = bet / 200;
  count5 = parseInt(count5);
  for (let i = 0; i < count5; i++) {
    bets.push(200);
  }

  bet = bet - count5 * 200;
  var count1 = bet / 50;
  count1 = parseInt(count1);
  for (let i = 0; i < count1; i++) {
    bets.push(50);
  }
  return bets
    .sort((a, b) => (a > b ? 1 : -1))
    .map((chip, i) => {
      return <PrintBet key={i} i={i} chip={chip} item={item} user={user} />;
    });
};
const PrintBet = (prop) => {
  const item = prop.item;
  var i = prop.i;
  var user = prop.user;
  var _s =
    item.username == user.username
      ? { marginTop: i * -3, marginLeft: i * 3 }
      : {
          marginTop: i * -3,
          marginLeft: i * 1 + 60,
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

function BetsWheel(prop) {
  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(prop.user);
  const [userbets, setuserbets] = useState([]);
  const [balance, setBalance] = useState(user?.balance2);

  const [list, setList] = useState([]);

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    EventBus.on("user", (data) => {
      setUser(data);
      setBalance(data?.balance2);
    });
    EventBus.on("users", (data) => {
      setuserbets(data);
    });
    EventBus.on("bets", (data) => {
      if (data != []) {
        setuserbets((current) => [...current, data]);
      }
    });
    EventBus.on("balance", (data) => {
      const userOld = JSON.parse(localStorage.getItem("user"));
      var _user = userOld;
      _user.balance2 = data;

      setUser(_user);
      setBalance(data);
    });
    EventBus.on("resetusers", (data) => {
      setuserbets([]);
    });
  }, []);
  useEffect(() => {
    var stat = [];

    if (userbets.length > 0) {
      var _gmode = groupByMultipleFields(userbets, "username", "position");
      for (const property in _gmode) {
        for (const pos in _gmode[property]) {
          stat.push({
            bet: sumOfBet(_gmode[property][pos]),

            position: parseInt(pos),
            username: property,
            win: sumOfWin(_gmode[property][pos]),
          });
        }
      }

      if (wheel.status == "Spining" || wheel.status == "Done") {
        stat.sort((a, b) => (a.win < b.win ? 1 : -1));
      } else {
        stat.sort((a, b) => (a.bet < b.bet ? 1 : -1));
      }
    }
    setList(stat);
    return () => {
      setList([]);
    };
  }, [userbets]);
  const betBtn = (ps, bet) => {
    if (wheel.status == "Pending") {
      return (
        <>
          <Button
            circular
            style={{
              background: getcolor(ps.replace("x", "")),
              color: getcolortext(ps.replace("x", "")),
            }}
            onClick={() => {
              addBet(ps, bet);
            }}
          >
            {ps}
            {haveBet(ps, list, user)}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            circular
            className={
              parseInt(ps.replace("x", "")) ==
                parseInt(segments[wheel?.number]) && wheel?.status == "Spining"
                ? "active b" +
                  list.filter((u) => parseInt(u.position) == parseInt(ps))
                    .length
                : "noactive b" +
                  list.filter((u) => parseInt(u.position) == parseInt(ps))
                    .length
            }
            style={{
              background: getcolor(ps.replace("x", "")),
              color: getcolortext(ps.replace("x", "")),
            }}
          >
            <div> {ps}</div>
            {haveBet(ps, list, user)}
          </Button>
        </>
      );
    }
  };
  const addBet = (pos, bet) => {
    let _b = bet ? bet : bet;
    if (wheel?.status == "Pending") {
      if (balance >= _b) {
        setBalance((prev) => prev - _b);
        EventBus.dispatch("balance", balance - _b);
        EventBus.dispatch("bets", {
          bet: parseInt(_b),
          position: parseInt(pos),
          username: user.username,
          image: user.image,
        });
        socket.emit("addBet", {
          bet: parseInt(_b),
          position: parseInt(pos),
        });
      } else {
        $(".showads").trigger("click");
      }
    }
  };

  return (
    <>
      <div
        className="mainwheel mywhell"
        style={{ zIndex: 2, width: 100, float: "left" }}
      >
        <div className="betarea">
          {segX.map((seg, i) => {
            return (
              <span key={i}>
                <Label
                  size="huge"
                  tag
                  style={{
                    background: getcolor(seg),
                    color: getcolortext(seg),
                    float: "left",
                    width: 100,
                  }}
                >
                  {seg}x
                </Label>
                {betBtn(seg + "x", prop.bet)}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BetsWheel;
