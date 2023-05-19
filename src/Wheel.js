import React, { useState, useEffect } from "react";
import { Segment, Tab } from "semantic-ui-react";

import List from "./List";

import LastList from "./LastList";
import Mywhell from "./MyWheel";
import { socket } from "./socket";
import AdsComponent from "./adsComponent";
export const apiPath = "";

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
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 10
  );

  const [user, setUser] = useState(socket.auth);

  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);

  if (panes.length == 0) {
    panes = [
      {
        menuItem: "Live",
        render: () => (
          <>
            <List size="mini" getPrize={getPrize} />
          </>
        ),
      },
      {
        menuItem: "Last",
        render: () => (
          <LastList size="mini" getPrize={getPrize} command="lastList" />
        ),
      },

      {
        menuItem: "Top Win",
        render: () => (
          <LastList size="mini" getPrize={getPrize} command="winList" />
        ),
      },
      {
        menuItem: "My Win",
        render: () => (
          <LastList
            size="mini"
            getPrize={getPrize}
            loginToken={user}
            command={"myList&u=" + user?.username}
          />
        ),
      },
    ];
  }

  return (
    <>
      <div className="home">
        <Mywhell bet={bet} setBet={setBet} />
      </div>
    </>
  );
}

export default App;
