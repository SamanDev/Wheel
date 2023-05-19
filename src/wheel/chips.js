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
            <GetChip
              chip={1}
              handleBet={prop.addBet}
              bet={prop.bet}
              setBet={prop.setBet}
            />
            <div style={user?.balance2 >= 5 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={5}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 10 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={10}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 25 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={25}
                handleBet={prop.addBet}
                bet={prop.bet}
                setBet={prop.setBet}
              />
            </div>
            <div style={user?.balance2 >= 50 ? {} : { opacity: 0.5 }}>
              <GetChip
                chip={50}
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
