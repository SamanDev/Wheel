import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import EventBus from "../common/EventBus";
import $ from "jquery";
import Modalwin from "./modalshow";
import { segments, getcolor, getcolortext } from "../utils/include";
var _l = [];

function MNyWheel(prop) {
  if (_l.length == 0) {
    segments.map((item, i) => {
      _l.push({
        style: {
          backgroundColor: getcolor(item),
          textColor: getcolortext(item),
        },

        option: "x" + item,
      });
    });
  }
  const [wheel, setWheel] = useState(prop.wheel);

  const updateWheel = () => {
    var colornum = getcolor(segments[wheel.number]);
    if ($(".showww .bhdLno").length) {
      $(".showww .bhdLno").css({
        filter: "drop-shadow(0px 0px 10px " + colornum + ")",
      });
    } else {
      setTimeout(() => {
        updateWheel();
      }, 1000);
    }
  };
  useEffect(() => {
    updateWheel();
  }, []);
  return (
    <>
      <div className="animate__animated  animate__rollIn showww">
        <Wheel
          startingOptionIndex={wheel.number}
          mustStartSpinning={false}
          outerBorderWidth={0}
          outerBorderColor={"#eeeeee20"}
          innerRadius={20}
          innerBorderColor={"#00000020"}
          innerBorderWidth={0}
          radiusLineColor={"#00000020"}
          radiusLineWidth={0}
          textDistance={70}
          fontSize={20}
          data={_l}
        />
      </div>
    </>
  );
}

export default MNyWheel;
