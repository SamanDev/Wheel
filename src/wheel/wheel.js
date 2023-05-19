import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import EventBus from "../common/EventBus";
import $ from "jquery";
import { segments, getcolor, getcolortext } from "../utils/include";
var _l = [];
const updateWheel = (wheel) => {
  console.log(wheel);
  if (wheel.status == "Spin") {
    var t1 = new Date(wheel.date);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var time = parseInt(Math.abs(Seconds_from_T1_to_T2));

    $(".mainwheel .bhdLno canvas").css({
      transform:
        "rotate(-" +
        parseFloat(
          parseInt(wheel.number) * (360 / segments.length) + (40 - time) * 360
        ) +
        "deg)",
      transition: "transform " + (40 - time) + "s",
    });
  } else {
    if (wheel.status == "Pending") {
      $(".mainwheel .bhdLno  canvas").css({
        transform:
          "rotate(-" +
          parseFloat(parseInt(wheel.startNum) * (360 / segments.length)) +
          "deg)",
        transition: "transform 2s",
      });
    }
    if (wheel.status == "Done") {
      $(".mainwheel .bhdLno canvas").css({
        transform:
          "rotate(-" +
          parseFloat(parseInt(wheel.number) * (360 / segments.length)) +
          "deg)",
        transition: "transform 0s",
      });
    }
  }
  var colornum = getcolor(segments[wheel.startNum]);
  if (wheel.status == "Spin") {
    colornum = "#000000";
  }

  if (wheel.status != "Spin" && wheel.status != "Pending") {
    colornum = getcolor(segments[wheel.number]);
  }
  $(".mainwheel .bhdLno").css({
    filter: "drop-shadow(0px 0px 10px " + colornum + ")",
  });
};
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

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
    updateWheel(wheel);
  }, []);

  useEffect(() => {
    updateWheel(wheel);
  }, [wheel?.status]);

  return (
    <>
      <div className="animate__animated  animate__rollIn">
        <Wheel
          startingOptionIndex={0}
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
