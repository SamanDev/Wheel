import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";
import { Label, Popup } from "semantic-ui-react";

import {
  getcolor,
  getcolortext,
  segX,
  groupByMultipleFields,
  sumOfBet,
  formatDollar,
  segments,
} from "../utils/include";
import UserService from "../services/user.service";
import $ from "jquery";
import { useBets, useUser } from "../hooks/user.hooks";

const getPosCount = (list, pos) => {
  var bets = 0;
  var peps = 0;
  if (list) {
    list
      .filter((user) => user.position == pos)
      .map((item, i) => {
        peps = peps + 1;

        bets = bets + item.bet;
      });
  }

  return [bets, peps];
};
const haveBet = (pos, list, user) => {
  return list
    .filter(
      (u) =>
        u.username == user?.username && parseInt(u.position) == parseInt(pos)
      //s(u) => parseInt(u.position) == parseInt(pos)
    )
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((item, i) => {
      return getChipsCount(item, user);
    });
};
const getChipsCount = (item, user) => {
  var bet = item.bet;
  var count500 = bet / 50000;
  var bets = [];
  count500 = parseInt(count500);

  for (let i = 0; i < count500; i++) {
    bets.push(50000);
  }
  bet = bet - count500 * 50000;

  var count250 = bet / 25000;

  count250 = parseInt(count250);

  for (let i = 0; i < count250; i++) {
    bets.push(25000);
  }
  bet = bet - count250 * 25000;

  var count50 = bet / 5000;

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
  var count5 = bet / 250;
  count5 = parseInt(count5);
  for (let i = 0; i < count5; i++) {
    bets.push(250);
  }

  bet = bet - count5 * 250;
  var count1 = bet / 50;
  count1 = parseInt(count1);
  for (let i = 0; i < count1; i++) {
    bets.push(50);
  }

  return bets.map((chip, i) => {
    return <PrintBet key={i} i={i} chip={chip} item={item} user={user} />;
  });
};
const PrintBet = (prop) => {
  const item = prop.item;
  var i = prop.i;
  var user = prop.user;
  var _s =
    item.username == user?.username
      ? { marginTop: i * -5, marginLeft: i * -3 }
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
  const wheel = prop.wheel;
  const user = prop.user;
  const [bets, list] = useBets();

  const [balance, setBalance] = useState(user?.balance2);
  const contextRef = React.useRef();

  const [con, setCon] = useState(false);

  useEffect(() => {
    setBalance(user?.balance2);
  }, [user]);
  useEffect(() => {
    EventBus.on("connect", (data) => {
      setCon(data);
    });
    EventBus.on("logout", (data) => {
      setCon(false);
    });
    return () => {
      EventBus.remove("connect");

      EventBus.remove("logout");
    };
  }, []);

  const addBet = (pos, bet) => {
    let _b = bet ? bet : bet;
    // console.log(con);
    if (con) {
      var t1 = new Date(wheel?.date);
      var t2 = new Date();
      var dif = t2.getTime() - t1.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

      if (balance >= _b) {
        if (parseInt(Seconds_Between_Dates) < 15) {
          setBalance((prev) => prev - _b);
          EventBus.dispatch("balance", balance - _b);
          EventBus.dispatch("mybets", {
            bet: parseInt(_b),
            position: parseInt(pos),
            username: user.username,
            image: user.image,
          });
          UserService.addBet({
            bet: parseInt(_b),
            position: parseInt(pos),
            username: user.username,
            image: user.image,
          })
            .then((response) => {})
            .catch((error) => EventBus.dispatch("logout"));
        }
      } else {
        $("#showadsmod").trigger("click");
      }
    }
  };

  return (
    <>
      <div ref={contextRef}></div>
      <Popup
        context={contextRef}
        open={true}
        position="top left"
        className={
          wheel?.status != "Pending" || !wheel?.status
            ? "animate__fadeInDown animate__animated"
            : "animate__animated animate__fadeOutUp"
        }
      >
        ⛔ Wait for next round.
      </Popup>
      <Popup
        context={contextRef}
        open={true}
        position="top left"
        className={
          wheel?.status == "Pending"
            ? "animate__fadeInDown animate__animated"
            : "animate__animated animate__fadeOutUp"
        }
      >
        Time to choose 👇
      </Popup>
      {segX.map((seg, i) => {
        var inf = getPosCount(list, seg);
        return (
          <Label
            size="huge"
            key={i}
            tag
            onClick={() => {
              addBet(seg, prop.bet);
            }}
            className={
              wheel?.status == "Spining" && segments[wheel?.number] == seg
                ? "animate__tada animate__animated animate__repeat-3 pen"
                : wheel?.status == "Spining"
                ? "b0 pen"
                : "pen"
            }
            style={{
              background: getcolor(seg),
              color: getcolortext(seg),
              float: "left",
              width: 100,
              marginBottom: 5,
              cursor: "pointer",
            }}
          >
            <div className={inf[1] > 0 ? "seg" : "seg none"}>
              <div className="segx">x{seg}</div>
              <div className="segttotal">
                {inf[1]}{" "}
                <img
                  src={"/assets/users.svg"}
                  alt="usersicon"
                  style={{ width: 16, height: 16 }}
                />{" "}
                {inf[0] <= 1000
                  ? formatDollar(inf[0])
                  : formatDollar(inf[0] / 1000) + "K"}
              </div>
            </div>
            <div className="betarea">{haveBet(seg, list, user)}</div>
          </Label>
        );
      })}
    </>
  );
}

export default BetsWheel;
