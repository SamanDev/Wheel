import React, { useState, useEffect } from "react";
import { Segment, Tab } from "semantic-ui-react";

import List from "./List";

import LastList from "./LastList";
import Mywhell from "./MyWheel";
import { socket } from "./socket";
import AdsComponent from "./adsComponent";
export const apiPath = "";

var panes = [];
var timer, timer2, timer3;
function App(prop) {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 1
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
            <List size="mini" />
          </>
        ),
      },
      {
        menuItem: "Last",
        render: () => <LastList size="mini" command="lastList" />,
      },

      {
        menuItem: "Top Win",
        render: () => <LastList size="mini" command="winList" />,
      },
      {
        menuItem: "My Win",
        render: () => (
          <LastList
            size="mini"
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
