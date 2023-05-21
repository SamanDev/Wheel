import React, { useState, useEffect } from "react";

import List from "./List";

import LastList from "./LastList";
import Mywhell from "./MyWheel";
import { socket } from "./socket";

export const apiPath = "";

var panes = [];

function App(prop) {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 200
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
      <Mywhell bet={bet} setBet={setBet} />
    </>
  );
}

export default App;
