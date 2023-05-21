import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";

function BetsWheel(prop) {
  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(prop.user);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
    EventBus.on("user", (data) => {
      setUser(data);
    });
    EventBus.on("balance", (data) => {
      const userOld = JSON.parse(localStorage.getItem("user"));
      var _user = userOld;
      _user.balance2 = data;

      setUser(_user);
    });
  }, []);

  return (
    <>
      <div
        className="mainwheel mywhell  animate__animated  animate__rollIn"
        style={{ zIndex: 2, width: 100, float: "right", marginTop: 20 }}
      >
        <div className="betbtnarea">
          <div
            className={
              wheel?.status == "Spin"
                ? "chiparea animate__animated animate__flipOutX"
                : "chiparea animate__animated animate__flipInY"
            }
          >
            <div style={user?.balance2 >= 50 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={50}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 200 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={200}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 500 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={500}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 1000 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={1000}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 5000 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={5000}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BetsWheel;
