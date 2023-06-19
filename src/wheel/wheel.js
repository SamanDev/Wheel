import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import CountWheel from "./count";
import Mod from "../modalads";
import Modalwin from "./modal";
import EventBus from "../common/EventBus";
import { segments, getcolor, getcolortext } from "../utils/include";
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
  const [wheel, setWheel] = useState();
  const [mustspin, setMustSpin] = useState(false);

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
      Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));

      Seconds_Between_Dates = 38 - Seconds_Between_Dates;
      Seconds_Between_Dates = Seconds_Between_Dates / 10;
      if (Seconds_Between_Dates < 0.01) {
        Seconds_Between_Dates = 0.01;
      }
      setMustSpin(true);
    } else {
      if (wheel?.status != "Spining") {
        setMustSpin(false);
      }
    }
  }, [wheel?.status]);

  return (
    <>
      <div className={"mainwheel mywhell"}>
        <>
          <CountWheel {...prop} />
          <div className="countover">
            <img src="/assets/cadr3.png" src2="/assets/cadr4.png" id="cadr" />
          </div>
          <Wheel
            startingOptionIndex={wheel?.number}
            mustStartSpinning={mustspin}
            data={_l}
            prizeNumber={wheel?.number}
            outerBorderWidth={0}
            outerBorderColor={"#eeeeee"}
            innerRadius={10}
            innerBorderColor={"#000000"}
            innerBorderWidth={0}
            radiusLineColor={"#000000"}
            radiusLineWidth={0}
            textDistance={80}
            fontSize={20}
            spinDuration={Seconds_Between_Dates}
          />
        </>

        <>
          <Modalwin />
          <Mod />
        </>
        <div className="ws"></div>
      </div>
    </>
  );
}

export default MNyWheel;
