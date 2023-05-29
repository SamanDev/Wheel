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
    <div className="chiparea">
      <div
        className={
          wheel?.status == "Spin"
            ? " animate__animated animate__backOutRight"
            : " animate__animated animate__backInRight"
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
        <div style={user?.balance2 >= 250 ? {} : { opacity: 0.5 }}>
          <GetChip
            chip={250}
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
  );
}

export default BetsWheel;
