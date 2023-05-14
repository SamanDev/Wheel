import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import GetChip from "./getChips";
import EventBus from "./common/EventBus";
import $ from "jquery";
import Mod from "./modalads";
import { useDispatch, useSelector } from "react-redux";
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
            addBet(ps, bet, users, socket, balance, setBalance, user);
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
const addBet = (pos, bet, users, socket, balance, setBalance, user) => {
  let _b = bet ? bet : bet;
  if (users?.status == "Pending") {
    if (balance >= _b) {
      setBalance((prev) => prev - _b);
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
var maintimer, timer, timer2;
function MNyWheel(prop) {
  const [time, setTime] = useState(0);
  const [sec, setSec] = useState(0);

  const socket = prop.socket;
  const bets = localStorage.getItem("lastbet")
    ? JSON.parse(localStorage.getItem("lastbet"))
    : [];

  const [balance, setBalance] = useState(0);

  const [online, setOnline] = useState(0);
  const [userbets, setuserbets] = useState([]);
  const [list, setList] = useState([]);

  const segments = prop.segments;

  if (_l.length == 0) {
    segments.map((item, i) => {
      _l.push({
        style: {
          backgroundColor: prop.getcolor(item),
          textColor: prop.getcolortext(item),
        },

        option: "x" + item,
      });
    });
  }
  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(socket.auth);

  useEffect(() => {
    socket.emit("getwheel");
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
    EventBus.on("user", (data) => {
      setUser(data);
    });
    EventBus.on("online", (data) => {
      setOnline(data);
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

  useEffect(() => {
    clearInterval(timer);
    timer = setInterval(() => {
      console.log(time);
      var t1 = new Date(wheel.date);
      var t2 = new Date();
      var dif = t1.getTime() - t2.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

      setTime(parseInt(Seconds_Between_Dates));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time, wheel]);

  useEffect(() => {
    if (time > 30 && time <= 35) {
      $(".mainwheel .bhdLno canvas").css({
        transform:
          "rotate(-" +
          parseFloat(
            parseInt(wheel.number) * (360 / segments.length) + 10 * 360
          ) +
          "deg)",
        transition: "transform " + (40 - time) + "s",
      });
    } else {
      if (wheel.status == "Pending") {
        $(".mainwheel .bhdLno  canvas").css({
          transform:
            "rotate(-" +
            parseFloat(parseInt(wheel.startNum) * (360 / segments.length)) +
            "deg)",
          transition: "transform 0s",
        });
      }
      if (wheel.status == "Done") {
        $(".mainwheel .bhdLno canvas").css({
          transform:
            "rotate(-" +
            parseFloat(parseInt(wheel.number) * (360 / segments.length)) +
            "deg)",
          transition: "transform 0s",
        });
      }
    }
    var colornum = prop.getcolor(segments[wheel.startNum]);
    if (wheel.status == "Spin") {
      colornum = "#000000";
    }

    if (wheel.status != "Spin" && wheel.status != "Pending") {
      colornum = prop.getcolor(segments[wheel.number]);
    }
    $(".mainwheel .bhdLno >div").css({
      filter: "drop-shadow(0px 0px 10px " + colornum + ")",
    });
  }, [time]);
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
      <div
        className="info animate__fadeIn animate__animated  animate__slower"
        style={{
          position: "absolute",
          color: "white",
          textAlign: "left",
          zIndex: 3,
          width: 200,
          fontSize: 12,
          padding: 10,

          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div>
          <span>
            <lord-icon
              src="https://cdn.lordicon.com/jgatzggh.json"
              trigger="morph"
              colors="outline:#794628,primary:#e8b730,secondary:#e8b730,tertiary:#000000"
              style={{ width: 25, height: 25 }}
            ></lord-icon>
          </span>{" "}
          {user?.username}
        </div>
        <div>
          <span>
            <lord-icon
              src="https://cdn.lordicon.com/axhjquvh.json"
              trigger="morph"
              colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
              style={{ width: 25, height: 25 }}
            ></lord-icon>
          </span>{" "}
          {online} online
        </div>
        <div>
          <span>
            <lord-icon
              src="https://cdn.lordicon.com/uvpkeeul.json"
              trigger="morph"
              colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
              style={{ width: 25, height: 23 }}
            ></lord-icon>
          </span>{" "}
          {balance}
        </div>
      </div>
      <div
        className="mainwheel mywhell"
        style={{ position: "absolute", right: 0, width: 0, zIndex: 1000 }}
      >
        <div className="betarea" style={{ right: 70, width: 0 }}>
          {betBtn(
            "2x",
            prop.bet,
            wheel,

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
            wheel,

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
            wheel,

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
            wheel,

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
            wheel,

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
            wheel,

            socket,
            balance,
            setBalance,
            user,
            list,
            prop.getcolor,
            prop.getcolortext
          )}
        </div>
      </div>
      <div
        className={
          (parseInt(30 - time) <= 3 && parseInt(30 - time) >= 0) ||
          wheel?.status == "Spin"
            ? "mainwheel mywhell mytrue"
            : "mainwheel mywhell"
        }
      >
        {wheel?.status == "Pending" && time <= 30 && time > 0 && (
          <>
            <div className="betarea">
              <h2 className="text-shadows animate__animated  animate__bounceIn">
                {30 - time}
              </h2>
            </div>
          </>
        )}
        <Mod id={user?._id} />
        <div className="animate__animated  animate__rollIn animate__delay-1s">
          <Wheel
            disableInitialAnimation={true}
            startingOptionIndex={0}
            mustStartSpinning={false}
            outerBorderWidth={0}
            outerBorderColor={"#00000050"}
            innerRadius={20}
            innerBorderColor={"#00000050"}
            innerBorderWidth={0}
            radiusLineColor={"#00000050"}
            radiusLineWidth={0}
            textDistance={70}
            fontSize={15}
            data={_l}
          />
        </div>
      </div>

      <div className="betbtnarea">
        <div
          className={
            wheel?.status != "Pending" ||
            (parseInt(30 - time) <= 3 && parseInt(30 - time) > 0)
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
              onClick={() => rebet(bets, wheel, socket, balance, setBalance)}
              style={{ marginTop: 50 }}
              size="large"
            >
              Rebet ${sumOfMyBet(bets)}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default MNyWheel;
