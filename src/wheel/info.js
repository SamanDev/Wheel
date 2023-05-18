import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";
import { Button, Header, Segment, Dimmer, Loader } from "semantic-ui-react";
import { Jetton } from "../utils/include";
var timer;
function BetsWheel(prop) {
  const [time, setTime] = useState(0);

  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(prop.user);
  const [online, setOnline] = useState(1);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    EventBus.on("user", (data) => {
      setUser(data);
    });
    EventBus.on("online", (data) => {
      setOnline(data);
    });
  }, []);

  useEffect(() => {
    clearInterval(timer);
    timer = setInterval(() => {
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
    const userOld = JSON.parse(localStorage.getItem("user"));
    var _new = user;
    _new.accessToken = userOld.accessToken;
    _new.id = userOld.id;
    localStorage.setItem("user", JSON.stringify(_new));
  }, [user]);

  return (
    <>
      <div className="info">
        <b>{user?.username}</b>
        <div style={{ float: "right" }}>
          <span>{online}</span>{" "}
          <span>
            {" "}
            <lord-icon
              src="https://cdn.lordicon.com/axhjquvh.json"
              trigger="morph"
              colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
              style={{ width: 25, height: 25 }}
            ></lord-icon>
          </span>
          <span>
            <Jetton />
          </span>{" "}
          <span> {user?.balance2}</span>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default BetsWheel;
