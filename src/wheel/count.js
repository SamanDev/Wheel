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
    clearInterval(timer);
    timer = setInterval(() => {
      var t1 = new Date(wheel.date);
      var t2 = new Date();
      var dif = t1.getTime() - t2.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

      setTime(parseInt(Seconds_Between_Dates));
    }, 1000);
  };
  return (
    <>
      {33 - time > 0 && time > 0 && (
        <>
          <div className="betarea">
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
