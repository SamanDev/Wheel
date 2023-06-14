import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Segment,
  Statistic,
  Image,
  Divider,
  Label,
} from "semantic-ui-react";

import EventBus from "../common/EventBus";
import {
  sumOfBet,
  sumOfWin,
  userBet,
  segments,
  getcolor,
  getcolortext,
  Jetton,
  groupByMultipleFields,
  formatDollar,
} from "../utils/include";
const getDelts = (item, betx, tit, num) => {
  var outb = "black";
  if (betx == -1) {
    outb = getcolor(num);
  }
  return (
    <>
      <span
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          textAlign: "center",
          zIndex: 120,
          color: "white",
          textShadow: "0 0 10px black",
          marginTop: "70px",
          fontSize: 16,
        }}
      >
        <br /> <b>{tit}</b> <br />
        {formatDollar(item?.bet * betx)}
        <Jetton style={{ width: 20, height: 20, display: "inline" }} />
        <br />
        <small>{item?.username}</small>
      </span>
      <Image
        circular
        src={item?.image}
        centered
        style={{
          width: "15vw",
          height: "15vw",
          maxWidth: "100px",
          maxHeight: "100px",
          transition: "all .5s ease-in",
          background: getcolor(item?.position) + "70",
          boxShadow:
            "0 0 2px black,0 0 0 " +
            getBorder(item?.bet * betx) +
            "px  " +
            getcolor(item?.position) +
            ", 0 0 20px " +
            getBorder(item?.bet * betx) +
            "px " +
            outb,
        }}
      />
    </>
  );
};
const getBorder = (bet) => {
  var _b = bet;
  if (_b < 0) {
    _b = _b * -1;
  }
  if (_b / 50 > 20) return 20;
  return _b / 50;
};
const bigWin = (list) => {
  var _l = list
    .filter((user) => user.win > 0)
    .sort((a, b) => (a.win < b.win ? 1 : -1));
  return _l[0];
};
const bigBet = (list) => {
  var _l = list.sort((a, b) => (a.bet < b.bet ? 1 : -1));

  return _l[0];
};
const bigLose = (list) => {
  var _l = list
    .filter((user) => user.win == 0)
    .sort((a, b) => (a.bet < b.bet ? 1 : -1));

  return _l[0];
};
var bigwin, biglose, bigbet;
function ModalExampleModal(prop) {
  const [bigbet, setBigBet] = useState([]);
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
  const [user, setUser] = useState(prop.user);
  const [bets, setbets] = useState(userBet(wheel, user?.username));
  const [userbets, setuserbets] = useState([]);
  const [userclass, setuserclass] = useState("");
  const [list, setList] = useState(userbets);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    EventBus.on("users", (data) => {
      setuserbets(data);
    });
    EventBus.on("bets", (data) => {
      if (data != []) {
        setuserbets((current) => [...current, data]);
      }
    });
    EventBus.on("resetusers", (data) => {
      setuserbets([]);
    });
    return () => {
      setuserbets([]);
      EventBus.remove("wheel");

      EventBus.remove("users");
      EventBus.remove("bets");
      EventBus.remove("resetusers");
    };
  }, []);
  useEffect(() => {
    var stat = [];

    if (userbets?.length > 0) {
      var _gmode = groupByMultipleFields(userbets, "username", "position");

      for (const property in _gmode) {
        for (const pos in _gmode[property]) {
          stat.push({
            bet: sumOfBet(_gmode[property][pos]),
            image: _gmode[property][pos][0].image,
            position: parseInt(pos),
            username: property,
          });
        }
      }
    }

    setList(stat);
  }, [userbets]);
  useEffect(() => {
    setbets(userBet(list, user?.username));
    bigwin = bigWin(userbets);
    setBigBet(bigBet(list));
    biglose = bigLose(userbets);
  }, [list, userbets, wheel?.status]);
  useEffect(() => {
    if (wheel?.status == "Pending") {
      setuserclass("animate__bounceIn animate__animated");
    }
  }, [bigbet]);
  useEffect(() => {
    if (wheel?.status == "Spining") {
      setuserclass("animate__bounceIn animate__animated");
    }
    if (wheel?.status == "Done" || wheel?.status == "Spin") {
      setuserclass("animate__bounceOut animate__animated");
    }
  }, [wheel?.status]);

  if (!wheel?.status) {
    return <div className="navbar-nav ml-auto"></div>;
  }
  return (
    <div className="count">
      <div className={userclass}>
        {sumOfWin(userbets) > 0 ? (
          <>
            {bigwin?.username && (
              <>
                {getDelts(
                  bigwin,
                  segments[wheel.number],
                  "Big Winner",
                  segments[wheel.number]
                )}
              </>
            )}
          </>
        ) : (
          <>
            {biglose?.username && (
              <>{getDelts(biglose, -1, "Big Loser", segments[wheel.number])}</>
            )}
          </>
        )}

        {(wheel?.status == "Pending" || wheel?.status == "Spin") && (
          <>
            {bigbet?.username && (
              <div className={userclass}>
                {getDelts(bigbet, 1, "Big Bet", segments[wheel.number])}
              </div>
            )}
          </>
        )}

        {bets[1] > 0 ? (
          <>
            <Statistic color="violet" inverted size="small">
              <Statistic.Value>{bets[1]}</Statistic.Value>
              <Statistic.Label>You Won</Statistic.Label>
              <Statistic.Value>
                <Label
                  size="huge"
                  style={{
                    background: getcolor(bigwin?.position),
                    color: getcolortext(bigwin?.position),
                    margin: "10px 10px",
                    display: "block",
                    textAlign: "center",
                    lineHeight: "23px",
                  }}
                >
                  {bets[1] / segments[wheel.number]}{" "}
                  <span
                    style={{
                      display: "inline",
                      position: "relative",
                      top: 4,
                    }}
                  ></span>{" "}
                  x{segments[wheel.number]}
                </Label>
              </Statistic.Value>
            </Statistic>
            <Divider />
          </>
        ) : (
          bets[0] > 0 && (
            <Statistic color="red" inverted size="mini">
              <Statistic.Value>You Lose</Statistic.Value>
              <Statistic.Label>Sorry...</Statistic.Label>
              <Statistic.Value>
                {bets[0]}{" "}
                <span style={{ position: "relative", top: 4 }}>
                  <Jetton />
                </span>
              </Statistic.Value>
            </Statistic>
          )
        )}
      </div>
    </div>
  );
}

export default ModalExampleModal;
