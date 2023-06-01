import React, { useState, useEffect } from "react";

import EventBus from "../common/EventBus";
var timer;
function CountWheel(prop) {
  const [time, setTime] = useState(0);

  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });

    if (wheel?.status == "Pending") {
      mytime();
    }
    return () => {
      EventBus.remove("wheel");
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    setTime(30);
    if (wheel?.status == "Pending") {
      mytime();
    }
    return () => {
      clearTimeout(timer);
      setTime(30);
    };
  }, [wheel?.status]);

  const mytime = () => {
    var t1 = new Date(wheel?.date);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

    setTime(parseInt(Seconds_Between_Dates));
    console.log(Seconds_Between_Dates);
    timer = setTimeout(() => {
      mytime();
    }, 500);
  };
  if (!wheel?.status) {
    return (
      <div className="count">
        <h2 className="text-shadows animate__animated  animate__bounceIn">
          wait
        </h2>
      </div>
    );
  }
  return (
    <>
      {30 - time > 0 && time < 30 && (
        <>
          <div className="count" style={{ zIndex: 11, marginTop: -70 }}>
            <h2 className="text-shadows animate__animated  animate__bounceIn">
              {30 - time}
            </h2>
          </div>
        </>
      )}
    </>
  );
}

export default CountWheel;
