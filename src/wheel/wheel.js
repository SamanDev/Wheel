import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import CountWheel from "./count";

import Modalwin from "./modal";
import EventBus from "../common/EventBus";
import { segments, getcolor, getcolortext } from "../utils/include";
import $ from "jquery";
var _l = [];

segments.map((item, i) => {
  _l.push({
    style: {
      backgroundColor: getcolor(item),
      textColor: getcolortext(item),
    },

    option: "x" + item,
  });
});
var Seconds_Between_Dates;
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
      //setWheel({});
      EventBus.remove("wheel");
    };
  }, []);
  useEffect(() => {
    if (wheel?.status == "Spin") {
      var t1 = new Date(wheel?.date);
      var t2 = new Date();
      var dif = t2.getTime() - t1.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      if (!mustspin) {
        Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

        Seconds_Between_Dates = parseFloat(37 - Seconds_Between_Dates).toFixed(
          2
        );

        Seconds_Between_Dates = Seconds_Between_Dates / 10;
        if (Seconds_Between_Dates < 0.01) {
          Seconds_Between_Dates = 0.01;
        } else {
        }
        setPrizeNumber(wheel.number);
        setMustSpin(true);
        $(".bhdLno").removeClass(
          "animate__flash animate__animated animate__faster"
        );
      }
    }
  }, [wheel?.status]);
  if (!wheel?.status) {
    return (
      <div className={"mainwheel mywhell"}>
        <CountWheel {...prop} />
      </div>
    );
  }
  return (
    <>
      <div className={"mainwheel mywhell"}>
        <>
          <CountWheel wheel={wheel} {...prop} />
          <div className="countover">
            <img src="/assets/cadr3.png" id="cadr" />
            <img src="/assets/cadr4.png" id="cadr2" />
          </div>
          <Wheel
            startingOptionIndex={prizeNumber}
            mustStartSpinning={wheel.status == "Spin" ? mustspin : false}
            data={_l}
            prizeNumber={prizeNumber}
            outerBorderWidth={0}
            outerBorderColor={"#eeeeee"}
            innerRadius={10}
            innerBorderColor={"#000000"}
            innerBorderWidth={0}
            radiusLineColor={"#000000"}
            radiusLineWidth={0}
            textDistance={80}
            fontSize={[20]}
            spinDuration={[Seconds_Between_Dates]}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
        </>

        <>
          <Modalwin />
        </>
        <div className="ws"></div>
      </div>
    </>
  );
}

export default MNyWheel;
