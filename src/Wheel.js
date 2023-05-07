import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader, Tab } from "semantic-ui-react";

import List from "./List";

import LastList from "./LastList";
import Mywhell from "./MyWheel";
import $ from "jquery";
import { socket } from "./socket";
import eventBus from "./common/EventBus";
export const apiPath = "";

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
const getcolor = (item) => {
  var def = "#000000";

  if (item == 25) {
    def = "darkred";
  }
  if (item == 20) {
    def = "#d44130";
  }
  if (item == 10) {
    def = "#f3d949";
  }
  if (item == 8) {
    def = "#4f92f8";
  }
  if (item == 2) {
    def = "#6cca56";
  }
  if (item == 4) {
    def = "#b233f3";
  }

  return def;
};
const getcolortext = (item) => {
  var def = "#ffffff";

  if (item == 10) {
    def = "#000000";
  }

  if (item == 2) {
    def = "#000000";
  }
  if (item == 0) {
    def = "#555555";
  }

  return def;
};
const getPrize = (newPrizeNumber, pos) => {
  var num = 0;
  if (parseInt(newPrizeNumber) == parseInt(pos)) {
    num = parseInt(pos);
  }

  return num;
};
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
const userBet = (bets, username) => {
  var stat = [];

  var _gmode = groupByMultipleFields(
    bets?.filter((u) => u.username == username),
    "username",
    "position"
  );
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
  stat.sort((a, b) => (a.bet < b.bet ? 1 : -1));

  return stat;
};
var panes = [];
var timer, timer2, timer3;
function App(prop) {
  const [online, setOnline] = useState(0);
  const [loading, setLoading] = useState(false);

  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 1
  );

  const [users, setUsers] = useState(prop.wheel);
  const [user, setUser] = useState(prop.currentUser);

  useEffect(() => {
    function onConnect() {
      socket.on("msg", ({ command, data }) => {
        if (command == "update") {
          setUsers(data);
        }
        if (command == "users") {
          eventBus.dispatch("users", data);
        }
        if (command == "resetusers") {
          eventBus.dispatch("resetusers");
        }
        if (command == "user") {
          setUser(data);
        }
        if (command == "online") {
          setOnline(data);
        }

        if (command == "disconnect") {
          socket.disconnect();
        }
      });
    }

    function onDisconnect() {
      setLoading("nologin");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  useEffect(() => {
    if (user) {
      socket.connect();
    } else {
      window.location = "/login";
    }

    // no-op if the socket is already connected

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (users) {
      if (users.status == "Spin") {
        clearTimeout(timer);
        timer = setTimeout(() => {
          var t1 = new Date(users.date);
          var t2 = new Date();
          var dif = t1.getTime() - t2.getTime();

          var Seconds_from_T1_to_T2 = dif / 1000;
          var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));
          console.log(39 - Seconds_Between_Dates);
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(users.number) * (360 / segments.length) +
                  (32 - Seconds_Between_Dates) * 360
              ) +
              "deg)",
            transition:
              "transform " + (39 - Seconds_Between_Dates) + "s ease-in-out",
          });
        }, 10);
      }
      if (users.status == "Spining") {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (!$(".mainwheel .bhdLno canvas").attr("style")) {
            $(".mainwheel .bhdLno canvas").css({
              transform:
                "rotate(-" +
                parseFloat(parseInt(users.number) * (360 / segments.length)) +
                "deg)",
              transition: "transform 1s ease-in-out",
            });
          }
        }, 100);
      }
      if (users.status == "Done") {
        $(".mainwheel .bhdLno canvas").css({
          transform:
            "rotate(-" +
            parseFloat(parseInt(users.number) * (360 / segments.length)) +
            "deg)",
          transition: "transform 0s ease-in-out",
        });
      }
      if (users.status == "Pending") {
        clearTimeout(timer2);
        timer2 = setTimeout(() => {
          if (!$(".mainwheel .bhdLno canvas").attr("style")) {
            $(".mainwheel .bhdLno canvas").css({
              transform:
                "rotate(-" +
                parseFloat(parseInt(users.startNum) * (360 / segments.length)) +
                "deg)",
              transition: "transform 0s ease-in-out",
            });
          }
        }, 100);
      }
    }
  }, [users.status]);

  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);

  if (loading == "nologin") {
    return (
      <Segment className="loadarea">
        <Dimmer active>
          <Loader size="massive">Try again later.</Loader>
        </Dimmer>
      </Segment>
    );
  }
  if (loading || !users) {
    return (
      <Segment className="loadarea">
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }

  if (panes.length == 0 || 1 == 1) {
    panes = [
      {
        menuItem: "Live",
        render: () => (
          <>
            <List
              segments={segments}
              getcolortext={getcolortext}
              getcolor={getcolor}
              users={users}
              size="mini"
              loginToken={user}
              getPrize={getPrize}
            />
          </>
        ),
      },
      {
        menuItem: "Last",
        render: () => (
          <LastList
            segments={segments}
            getcolortext={getcolortext}
            getcolor={getcolor}
            size="mini"
            getPrize={getPrize}
            loginToken={user}
            socket={socket}
            command="lastList"
          />
        ),
      },

      {
        menuItem: "Top Win",
        render: () => (
          <LastList
            segments={segments}
            getcolortext={getcolortext}
            getcolor={getcolor}
            size="mini"
            getPrize={getPrize}
            loginToken={user}
            socket={socket}
            command="winList"
          />
        ),
      },
      {
        menuItem: "My Win",
        render: () => (
          <LastList
            segments={segments}
            getcolortext={getcolortext}
            getcolor={getcolor}
            size="mini"
            getPrize={getPrize}
            loginToken={user}
            socket={socket}
            command={"myList&u=" + user?.username}
          />
        ),
      },
    ];
  }

  return (
    <>
      <div
        className="lsec realPixel"
        style={{
          backgroundColor: "rgba(255,255,255,0)",
        }}
      >
        <Mywhell
          users={users}
          bet={bet}
          setBet={setBet}
          getcolor={getcolor}
          getcolortext={getcolortext}
          segments={segments}
          loginToken={user}
          socket={socket}
          online={online}
        />

        <Segment color="black" inverted size="mini" className="betlist">
          <div className="table rsec">
            <Tab
              color="black"
              menu={{
                color: "black",
                inverted: true,
                attached: true,
                tabular: false,
                pointing: true,
              }}
              panes={panes}
              renderActiveOnly={true}
            />
          </div>
        </Segment>
      </div>
    </>
  );
}

export default App;
