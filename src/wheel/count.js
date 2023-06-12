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
    if (wheel?.status) {
      mytime();
    }
    return () => {
      EventBus.remove("wheel");
    };
  }, []);

  useEffect(() => {
    mytime();

    if (wheel?.status == "Spining") {
      $(".mainwheel").removeClass("mytrue");
      $(".mainwheel .bhdLno").removeClass("rotaslw");
      $(".wheelstylee").html("");
      clearTimeout(timer);
    }
  }, [wheel?.status]);
  useEffect(() => {
    $(".bhdLno img").remove();
    clearTimeout(timer);
    if (30 - time <= 20 && 30 - time >= 0 && time != 30) {
      if ($(".wheelstylee").html() == "") {
        $(".mainwheel").addClass("mytrue");
        $(".mainwheel .bhdLno").addClass("rotaslw");
        $(".wheelstylee").html(
          "<style>.rotaslw{animation-timing-function: cubic-bezier(0.1, -0.07, 0.001, 1);animation-name: loadingslow ;animation-duration:" +
            (40 - time) +
            "s  ;}@keyframes loadingslow {  0% { transform: rotate(0deg);  }  100% {  transform: rotate(" +
            (60 - time) * 360 +
            "deg);     }</style>"
        );
      }
    }

    if (30 - time >= 0) {
      timer = setTimeout(() => {
        mytime();
      }, 1000);
    }
  }, [time]);

  const mytime = () => {
    if (wheel?.status) {
      var t1 = new Date(wheel?.date);
      var t2 = new Date();
      var dif = t1.getTime() - t2.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));
      if (time != parseInt(Seconds_Between_Dates)) {
        setTime(parseInt(Seconds_Between_Dates));
      }
    } else {
      setTimeout(() => {
        mytime();
      }, 1000);
    }
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
      {30 - time >= 0 && time < 30 && (
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
