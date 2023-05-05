import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Header } from "semantic-ui-react";
import GetChip from "./getChips";
import $ from "jquery";
const segments = [
  "2",
  "4",
  "2",
  "8",
  "2",
  "4",
  "2",
  "4",
  "2",
  "8",
  "2",
  "20",
  "2",
  "4",
  "2",
  "4",
  "2",
  "4",
  "2",
  "4",
  "2",
  "10",
  "2",
  "8",
  "2",
  "25",
  "2",
  "0",
  "10",
];
function groupBySingleField(data, field) {
  return data.reduce((acc, val) => {
    const rest = Object.keys(val).reduce((newObj, key) => {
      if (key !== field) {
        newObj[key] = val[key];
      }
      return newObj;
    }, {});
    if (acc[val[field]]) {
      acc[val[field]].push(rest);
    } else {
      acc[val[field]] = [rest];
    }
    return acc;
  }, {});
}
function groupByMultipleFields(data, ...fields) {
  if (fields.length === 0) return;
  let newData = {};
  const [field] = fields;
  newData = groupBySingleField(data, field);
  const remainingFields = fields.slice(1);
  if (remainingFields.length > 0) {
    Object.keys(newData).forEach((key) => {
      newData[key] = groupByMultipleFields(newData[key], ...remainingFields);
    });
  }
  return newData;
}
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

  var _c = "";

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
const getPrizePos = (users, sec) => {
  var newPrizeNumber = users?.serverCode * users?.startNum;

  return newPrizeNumber;
};
const betBtn = (
  ps,
  bet,
  users,

  socket,
  balance,
  setBalance,
  user,
  list,
  getcolor,
  getcolortext
) => {
  var t1 = new Date(users.date);
  var t2 = new Date();
  var dif = t1.getTime() - t2.getTime();

  var Seconds_from_T1_to_T2 = dif / 1000;

  var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));
  if (Seconds_Between_Dates < 27 && users.status == "Pending") {
    return (
      <>
        <Button
          circular
          style={{
            background: getcolor(ps.replace("x", "")),
            color: getcolortext(ps.replace("x", "")),
          }}
          onClick={() => {
            addBet(ps, bet, users, socket, balance, setBalance);
          }}
        >
          {ps}
          {haveBet(list, ps, users, user)}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          circular
          className={
            parseInt(ps.replace("x", "")) == parseInt(segments[users.number]) &&
            users.status == "Spining"
              ? "active b" +
                list.filter((u) => parseInt(u.position) == parseInt(ps)).length
              : "noactive b" +
                list.filter((u) => parseInt(u.position) == parseInt(ps)).length
          }
          style={{
            background: getcolor(ps.replace("x", "")),
            color: getcolortext(ps.replace("x", "")),
          }}
        >
          <div> {ps}</div>
          {haveBet(list, ps, users, user)}
        </Button>
      </>
    );
  }
};
const addBet = (pos, bet, users, socket, balance, setBalance) => {
  let _b = bet ? bet : bet;
  if (users?.status == "Pending") {
    setBalance((prev) => prev - _b);
    socket.emit("addBet", {
      bet: parseInt(_b),
      position: parseInt(pos),
    });
  }
};
const haveBet = (list, pos, users, user) => {
  return list
    .filter(
      // (u) => u.username == prop.loginToken.username && u.position == pos
      (u) => parseInt(u.position) == parseInt(pos)
    )
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((item, i) => {
      return getChipsCount(item, users, user);
    });
};
const rebet = (bets, users, socket, balance, setBalance) => {
  bets.map((item, i) => {
    addBet(item.position, item.bet, users, socket, balance, setBalance);
  });
};

const sumOfMyBet = (bets) => {
  return bets.reduce((sum, currentValue) => {
    var _am = currentValue.bet;
    return sum + _am;
  }, 0);
};
var _l = [];
var timer, timer2;
function MNyWheel(prop) {
  const [time, setTime] = useState(0);
  const [sec, setSec] = useState(0);
  const online = prop.online;
  const socket = prop.socket;
  const bets = localStorage.getItem("lastbet")
    ? JSON.parse(localStorage.getItem("lastbet"))
    : [];
  const user = prop.loginToken;
  const [balance, setBalance] = useState(0);
  const [list, setList] = useState([]);
  const users = prop.users;
  const segments = prop.segments;

  if (_l.length == 0) {
    segments.map((item, i) => {
      _l.push({
        style: {
          backgroundColor: prop.getcolor(item),
          textColor: prop.getcolortext(item),
        },
        option2: i + " . . . . . x" + item,
        option: "x" + item,
      });
    });
  }

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
  useEffect(() => {
    var stat = [];

    if (users?.users.length > 0) {
      var _gmode = groupByMultipleFields(users?.users, "username", "position");
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

      if (users.status == "Spining" || users.status == "Done") {
        stat.sort((a, b) => (a.win < b.win ? 1 : -1));
      } else {
        stat.sort((a, b) => (a.bet < b.bet ? 1 : -1));
      }
    }
    setList(stat);
    return () => {
      setList([]);
    };
  }, [users?.users]);

  useEffect(() => {
    var t1 = new Date(users.date);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    var bagh = 30 - (Seconds_Between_Dates % 30);
    var mysec = users.serverSec;
    if (users.status == "Pending") {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mysec = (t1.getSeconds() + Seconds_Between_Dates) % 60;

        setSec(parseInt(mysec));
        setTime(parseInt(bagh));
      }, 1000);
    }

    return () => {
      //clearTimeout(timer);
    };
  }, [users.status, users.date, time]);

  return (
    <>
      <div
        className="info animate__fadeIn animate__animated  animate__slower"
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
          {!prop.last ? (
            <>
              {user?.username}
              <br /> ${balance}
              <br />
              Online: {online}
              <br />
            </>
          ) : (
            <>{users?._id}</>
          )}
          <br />
        </>
      </div>

      <div
        className={
          (parseInt(time) <= 3 && parseInt(time) >= 0) ||
          users?.status == "Spin"
            ? "mainwheel mywhell mytrue"
            : "mainwheel mywhell"
        }
      >
        {users?.status == "Pending" && time > 0 && (
          <>
            <div className="betarea">
              <h2 className="text-shadows animate__animated  animate__bounceIn">
                {time}
              </h2>
            </div>
          </>
        )}
        <div className="betarea" style={{ left: 500 }}>
          {betBtn(
            "2x",
            prop.bet,
            users,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
          {betBtn(
            "4x",
            prop.bet,
            users,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
          {betBtn(
            "8x",
            prop.bet,
            users,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
          {betBtn(
            "10x",
            prop.bet,
            users,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
          {betBtn(
            "20x",
            prop.bet,
            users,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
          {betBtn(
            "25x",
            prop.bet,
            users,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
        </div>
        <div className="animate__animated  animate__rollIn">
          <Wheel
            startingOptionIndex={0}
            mustStartSpinning={false}
            backgroundColors={[
              "#F22B35",
              "#F99533",
              "#24CA69",
              "#514E50",
              "#46AEFF",
              "#9145B7",
            ]}
            outerBorderWidth={10}
            outerBorderColor={"gold"}
            innerRadius={20}
            innerBorderColor="gold"
            innerBorderWidth={10}
            radiusLineWidth={1}
            textDistance={70}
            fontSize={15}
            data={_l}
          />
        </div>
      </div>
      {!users?._id && (
        <div className="betbtnarea">
          <div
            className={
              users?.status != "Pending" ||
              (parseInt(time) <= 3 && parseInt(time) >= 0)
                ? "chiparea animate__animated animate__flipOutX"
                : "chiparea animate__animated animate__flipInY"
            }
          >
            <GetChip
              chip={1}
              handleBet={addBet}
              bet={prop.bet}
              setBet={prop.setBet}
            />
            <div style={balance >= 5 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={5}
                handleBet={addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={balance >= 10 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={10}
                handleBet={addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={balance >= 25 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={25}
                handleBet={addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={balance >= 50 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={50}
                handleBet={addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            {bets?.length > 0 && balance >= sumOfMyBet(bets) && (
              <Button
                onClick={() => rebet(bets, users, socket, balance, setBalance)}
                style={{ marginTop: 50 }}
                size="large"
              >
                Rebet ${sumOfMyBet(bets)}
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MNyWheel;
