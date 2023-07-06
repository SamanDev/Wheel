import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import $ from "jquery";
import CountWheel from "./count";

import Modalwin from "./modal";
import EventBus from "../common/EventBus";
import { segments, getcolor, getcolortext } from "../utils/include";
var _l = [];

segments.map((item, i) => {
  _l.push({
    option: "x" + item,
    style: {
      backgroundColor: getcolor(item),
      textColor: getcolortext(item),
    },
  });
});
var Seconds_Between_Dates = 0.1;
function MNyWheel(prop) {
  const [wheel, setWheel] = useState({});
  const [mustspin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    return () => {
      EventBus.remove("wheel");
    };
  }, []);
  useEffect(() => {
    if (wheel?.status) {
      if (wheel?.status == "Spin") {
        var t1 = new Date(wheel?.date);
        var t2 = new Date();
        var dif = t2.getTime() - t1.getTime();

        var Seconds_from_T1_to_T2 = dif / 1000;
        Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

        Seconds_Between_Dates = 38 - Seconds_Between_Dates;

        Seconds_Between_Dates = Seconds_Between_Dates / 10;
        Seconds_Between_Dates = parseFloat(Seconds_Between_Dates).toFixed(2);
        if (Seconds_Between_Dates < 0.01) {
          Seconds_Between_Dates = 0.02;
        } else {
        }
        setPrizeNumber(wheel?.number);
        setMustSpin(true);
      } else {
        if (wheel?.status == "Pending") {
          setPrizeNumber(wheel?.startNum);
        } else {
          $(".mainwheel .bhdLno").removeClass(
            "animate__flash animate__animated animate__faster"
          );
          setMustSpin(false);
          setPrizeNumber(wheel?.number);
        }
      }
    }
  }, [wheel?.status]);
  if (!wheel?.status) {
    return (
      <div className="mainwheel mywhell">
        <CountWheel wheel={wheel} {...prop} />
      </div>
    );
  }

  return (
    <>
      <div className="mainwheel mywhell">
        <CountWheel wheel={wheel} {...prop} />
        <div className="countover">
          <img src="/assets/cadr3.png" id="cadr" />
          <img src="/assets/cadr4.png" id="cadr2" />
        </div>
        <Wheel
          data={_l}
          mustStartSpinning={mustspin}
          outerBorderWidth={0}
          prizeNumber={prizeNumber}
          startingOptionIndex={wheel.startNum}
          outerBorderColor={"#eeeeee"}
          innerRadius={10}
          innerBorderColor={"#000000"}
          innerBorderWidth={0}
          radiusLineColor={"#000000"}
          radiusLineWidth={0}
          textDistance={80}
          fontSize={[20]}
          spinDuration={parseFloat(Seconds_Between_Dates)}
          onStopSpinning={() => {
            $(".mainwheel .bhdLno").addClass(
              "animate__flash animate__animated animate__faster"
            );
            setMustSpin(false);
          }}
        />

        <Modalwin wheel={wheel} />

        <div className="ws"></div>
      </div>
    </>
  );
}

export default MNyWheel;
