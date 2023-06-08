import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import $ from "jquery";
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
    if ($(".showww .bhdLno >div").length) {
      $(".showww .bhdLno >div").css({
        border: "  10px solid " + colornum + "",
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
      <div
        className="animate__animated  animate__rollIn showww"
        style={{ height: 300 }}
      >
        <div className="countover">
          <img src="/assets/cadr.png" src2="/assets/cadr2.png" id="cadr" />
        </div>
        <Wheel
          startingOptionIndex={wheel.number}
          mustStartSpinning={false}
          outerBorderWidth={0}
          outerBorderColor={"#eeeeee"}
          innerRadius={1}
          innerBorderColor={"#000000"}
          innerBorderWidth={0}
          radiusLineColor={"#000000"}
          radiusLineWidth={0}
          textDistance={80}
          fontSize={20}
          data={_l}
        />
      </div>
    </>
  );
}

export default MNyWheel;
