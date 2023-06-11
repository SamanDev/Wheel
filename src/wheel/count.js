import React, { useState, useEffect } from "react";
import $ from "jquery";
import EventBus from "../common/EventBus";
var timer;
function CountWheel(prop) {
  const [time, setTime] = useState(0);

  const [wheel, setWheel] = useState({});

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });

    if (wheel?.status == "Pending") {
      clearTimeout(timer);

      mytime();
    }
    return () => {
      setWheel({});
      EventBus.remove("wheel");
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    setTime(30);
    if (wheel?.status == "Pending") {
      $(".mainwheel .bhdLno").removeClass("rotaslw");
      $(".wheelstylee").html("");
      mytime();
    }
    return () => {
      clearTimeout(timer);
      setTime(30);
    };
  }, [wheel?.status]);
  useEffect(() => {
    if (30 - time < 20 && time != 30) {
      if ($(".wheelstylee").html() == "") {
        $(".mainwheel .bhdLno").addClass("rotaslw");
        $(".wheelstylee").html(
          "<style>.rotaslw{animation: loadingslow " +
            (39 - time) +
            "s cubic-bezier(0.215, 0.610, 0.355, 1);}@keyframes loadingslow {  0% { transform: rotate(0deg);  }  100% {  transform: rotate(" +
            (39 - time) * 360 +
            "deg);     }</style>"
        );
      }
    }
  }, [time]);

  const mytime = () => {
    var t1 = new Date(wheel?.date);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

    setTime(parseInt(Seconds_Between_Dates));

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
