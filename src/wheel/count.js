import React, { useState, useEffect } from "react";

import EventBus from "../common/EventBus";
var timer;
function CountWheel(prop) {
  const [time, setTime] = useState(0);

  const [wheel, setWheel] = useState({});

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
  }, []);

  useEffect(() => {
    mytime();
  }, [wheel.date]);

  const mytime = () => {
    if (!wheel?.status) return false;

    clearTimeout(timer);
    var t1 = new Date(wheel.date);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

    setTime(parseInt(Seconds_Between_Dates));
    timer = setTimeout(() => {
      mytime();
    }, 1000);
  };
  if (!wheel?.status) {
    return (
      <div className="count">
        <h2 className="text-shadows animate__animated  animate__bounceIn">
          ...
        </h2>
      </div>
    );
  }
  return (
    <>
      {33 - time > 0 && time > 0 && (
        <>
          <div className="count">
            <h2 className="text-shadows animate__animated  animate__bounceIn">
              {32 - time}
            </h2>
          </div>
        </>
      )}
    </>
  );
}

export default CountWheel;
