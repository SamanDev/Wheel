import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader, Tab } from "semantic-ui-react";

import List from "./List";

import LastList from "./LastList";
import Mywhell from "./MyWheel";
import $ from "jquery";
import { socket } from "./socket";
import EventBus from "./common/EventBus";
import AdsComponent from "./adsComponent";
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
    def = "#F71BBF";
  }
  if (item == 4) {
    def = "#FF3B19";
  }
  if (item == 10) {
    def = "#8523E8";
  }
  if (item == 20) {
    def = "#F5C218";
  }
  if (item == 8) {
    def = "#2CF501";
  }
  if (item == 2) {
    def = "#19CFFF";
  }

  return def;
};
const getcolortext = (item) => {
  var def = "#eeeeee";

  if (item == 2) {
    def = "#eeeeee";
  }

  if (item == 8) {
    def = "#666666";
  }
  if (item == 20) {
    def = "#eeeeee";
  }
  if (item == 10) {
    def = "#666666";
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

var panes = [];
var timer, timer2, timer3;
function App(prop) {
  const [loading, setLoading] = useState(false);

  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 1
  );

  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(prop.currentUser);

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
  if (loading) {
    return (
      <Segment className="loadarea">
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }

  if (panes.length == 0) {
    panes = [
      {
        menuItem: "Live",
        render: () => (
          <>
            <List
              segments={segments}
              getcolortext={getcolortext}
              getcolor={getcolor}
              users={wheel}
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
          wheel={wheel}
          bet={bet}
          setBet={setBet}
          getcolor={getcolor}
          getcolortext={getcolortext}
          segments={segments}
          currentUser={user}
          socket={socket}
        />
        <AdsComponent dataAdSlot="X2XXXXXXXX" />
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
