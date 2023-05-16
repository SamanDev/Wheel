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
  }, []);

  return (
    <>
      <div className="betbtnarea">
        <div
          className={
            wheel?.status != "Pending"
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
    </>
  );
}

export default BetsWheel;
