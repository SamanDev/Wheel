import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Header } from "semantic-ui-react";
import GetChip from "./getChips";
import {
  segments,
  getcolor,
  getcolortext,
  groupByMultipleFields,
} from "./utils/include";
import Modalwin from "./wheel/modalshow";
const PrintBet = (prop) => {
  var item = prop.item;
  var i = prop.i;
  var user = prop.user;
  var users = prop.users;
  var _s =
    item.username == user?.username
      ? { marginTop: i * -3, marginLeft: i * 3 }
      : {
          marginTop: i * -3,
          marginLeft: i * -3,
          transform: "scale(.5)",
        };
  var _c = "";
  if (item.win > 0) {
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
var _l = [];
function MNyWheel(prop) {
  const user = prop.loginToken;

  const [list, setList] = useState([]);
  const users = prop.wheel;

  var _sec = users?.serverSec;
  if (_l.length == 0) {
    segments.map((item, i) => {
      _l.push({
        style: {
          backgroundColor: getcolor(item),
          textColor: getcolortext(item),
        },
        option: i + " ... . . . . . x" + item,
        option2: "x" + item,
      });
    });
  }
  useEffect(() => {
    var stat = [];
    if (users.wheelusers.length > 0) {
      var _gmode = groupByMultipleFields(
        users.wheelusers,
        "username",
        "position"
      );
      for (const property in _gmode) {
        for (const pos in _gmode[property]) {
          stat.push({
            bet: sumOfBet(_gmode[property][pos]),
            status: _gmode[property][pos].status,
            position: parseInt(pos),
            username: property,
            win: sumOfWin(_gmode[property][pos]),
          });
        }
      }

      stat.sort((a, b) => (a.win < b.win ? 1 : -1));
    }
    setList(stat);
  }, []);
  const getPrizePos = (users, sec) => {
    var newPrizeNumber = users.serverCode * users?.startNum;

    return newPrizeNumber;
  };
  const haveBet = (pos) => {
    return list
      .filter(
        // (u) => u.username == loginToken.username && u.position == pos
        (u) => parseInt(u.position) == parseInt(pos)
      )
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .map((item, i) => {
        return getChipsCount(item, users, user);
      });
  };
  const betBtn = (ps, getcolor, getcolortext) => {
    return (
      <>
        <Button
          circular
          className={
            parseInt(ps.replace("x", "")) == parseInt(segments[users.number])
              ? "active b ltr" +
                users.wheelusers.filter(
                  (u) => parseInt(u.position) == parseInt(ps)
                ).length
              : "noactive b ltr" +
                users.wheelusers.filter(
                  (u) => parseInt(u.position) == parseInt(ps)
                ).length
          }
          style={{
            background: getcolor(ps.replace("x", "")),
            color: getcolortext(ps.replace("x", "")),
          }}
        >
          <div> {ps}</div>
          {haveBet(ps)}
        </Button>
      </>
    );
  };

  const sumOfBet = (array) => {
    return array.reduce((sum, currentValue) => {
      var _am = currentValue.bet;
      return sum + _am;
    }, 0);
  };

  const sumOfWin = (array) => {
    return array.reduce((sum, currentValue) => {
      var _am = currentValue.win;
      return sum + _am;
    }, 0);
  };
  return (
    <>
      <div
        className="info animate__fadeIn animate__animated  animate__delay-1s"
        style={{
          position: "absolute",
          color: "white",
          textAlign: "left",
          zIndex: 3,
          width: 150,

          lineHeight: "15px",
          padding: 10,

          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
        }}
      >
        <>
          <>{users?._id}</>

          <br />
          <small className="text-muted">Server Code: </small>
          <Header as="p" inverted color="blue" style={{ display: "inline" }}>
            {users?.serverCode}
          </Header>
          <br style={{ clear: "both" }} />
          <small className="text-muted">Start Number: </small>
          <Header as="p" inverted style={{ display: "inline" }} color="purple">
            {users?.startNum}
          </Header>
          <br style={{ clear: "both" }} />
          <small className="text-muted">Start Second: </small>
          <Header as="p" inverted color="green" style={{ display: "inline" }}>
            {_sec}
          </Header>

          <br style={{ clear: "both" }} />
          <small className="text-muted">Formula:</small>
          <br />

          <Header as="p" inverted floated="left" color="blue">
            {users?.serverCode}
          </Header>
          <Header as="small" inverted floated="left" color="grey">
            x
          </Header>
          <Header as="p" inverted floated="left" color="purple">
            {users?.startNum}
          </Header>
          <Header as="small" inverted floated="left" color="grey">
            +
          </Header>
          <br style={{ clear: "both" }} />

          <Header as="p" inverted floated="left" color="blue">
            {users?.serverCode}
          </Header>
          <Header as="small" inverted floated="left" color="grey">
            x
          </Header>

          <Header as="p" inverted floated="left" color="green">
            {_sec}
          </Header>
          <Header as="small" inverted floated="left" color="grey">
            =
          </Header>
          <br style={{ clear: "both" }} />
          <Header as="p" inverted floated="left" color="red">
            {getPrizePos(users) + users.serverCode * _sec}
          </Header>
          <br style={{ clear: "both" }} />
          <small className="text-muted">Formula Final:</small>
          <br />
          <Header as="p" inverted floated="left" color="red">
            {getPrizePos(users) + users.serverCode * _sec}
          </Header>

          <Header as="small" inverted floated="left" color="grey">
            %
          </Header>
          <Header as="p" inverted floated="left" color="green">
            {segments.length}
          </Header>
          <Header as="small" floated="left" inverted color="grey">
            =
          </Header>
          <br style={{ clear: "both" }} />
          <Header as="h3" inverted color="green">
            {(getPrizePos(users, _sec) + users.serverCode * _sec) %
              segments.length}
          </Header>
          <small className="text-muted">Final:</small>
          <Header as="h3" inverted color="green">
            {users.number}
          </Header>
        </>
      </div>
      <div
        className=" mywhell"
        style={{ position: "absolute", right: 0, width: 0, zIndex: 1000 }}
      >
        <div className="betarea" style={{ right: 70, width: 0 }}>
          {betBtn(
            "2x",

            getcolor,
            getcolortext
          )}
          {betBtn(
            "4x",

            getcolor,
            getcolortext
          )}
          {betBtn(
            "8x",

            getcolor,
            getcolortext
          )}
          {betBtn(
            "10x",

            getcolor,
            getcolortext
          )}
          {betBtn(
            "20x",

            getcolor,
            getcolortext
          )}
          {betBtn(
            "25x",

            getcolor,
            getcolortext
          )}
        </div>
      </div>

      <div className={"mywhell"}>
        <div className="animate__animated  animate__rollIn">
          <Wheel
            prizeNumber={users?.number}
            mustStartSpinning={false}
            startingOptionIndex={users?.number}
            backgroundColors={[
              "#F22B35",
              "#F99533",
              "#24CA69",
              "#514E50",
              "#46AEFF",
              "#9145B7",
            ]}
            spinDuration={0.3}
            outerBorderWidth={10}
            outerBorderColor={"gold"}
            innerRadius={20}
            innerBorderColor="gold"
            innerBorderWidth={10}
            radiusLineWidth={0}
            textDistance={50}
            fontSize={11}
            data={_l}
          />
        </div>
      </div>
    </>
  );
}

export default MNyWheel;
