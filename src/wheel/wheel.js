import React from "react";
import { Wheel } from "react-custom-roulette";

import CountWheel from "./count";
import Mod from "../modalads";
import Modalwin from "./modal";
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
  return (
    <>
      <div className={"mainwheel mywhell"}>
        <CountWheel {...prop} />
        <div className="countover">
          <img src="/assets/cadr.png" src2="/assets/cadr2.png" id="cadr" />
        </div>

        <Wheel
          startingOptionIndex={0}
          mustStartSpinning={false}
          outerBorderWidth={0}
          outerBorderColor={"#eeeeee"}
          innerRadius={10}
          innerBorderColor={"#000000"}
          innerBorderWidth={0}
          radiusLineColor={"#000000"}
          radiusLineWidth={0}
          textDistance={80}
          fontSize={20}
          data={_l}
        />

        <>
          <Modalwin />
          <Mod />
        </>
      </div>
    </>
  );
}

export default MNyWheel;
