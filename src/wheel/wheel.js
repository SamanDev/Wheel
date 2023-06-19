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
      setMustSpin(true);
    } else {
      setMustSpin(false);
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
            spinDuration={2.1}
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
