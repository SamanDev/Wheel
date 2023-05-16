import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import EventBus from "../common/EventBus";
import $ from "jquery";
var _l = [];
var timer = false;
var blnSpin = false;
function MNyWheel(prop) {
  const segments = prop.segments;

  if (_l.length == 0) {
    segments.map((item, i) => {
      _l.push({
        style: {
          backgroundColor: prop.getcolor(item),
          textColor: prop.getcolortext(item),
        },

        option: "x" + item,
      });
    });
  }
  const [wheel, setWheel] = useState({});

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
  }, []);

  useEffect(() => {
    updateWheel();
  }, [wheel.status]);
  const updateWheel = () => {
    if (wheel.status == "Spin") {
      var t1 = new Date(wheel.date);
      var t2 = new Date();
      var dif = t1.getTime() - t2.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var time = parseInt(Math.abs(Seconds_from_T1_to_T2));
      blnSpin = true;
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
          transition: "transform 0s",
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
    var colornum = prop.getcolor(segments[wheel.startNum]);
    if (wheel.status == "Spin") {
      colornum = "#000000";
    }

    if (wheel.status != "Spin" && wheel.status != "Pending") {
      colornum = prop.getcolor(segments[wheel.number]);
    }
    $(".mainwheel .bhdLno").css({
      filter: "drop-shadow(0px 0px 40px " + colornum + ")",
    });
  };

  return (
    <>
      <div className="animate__animated  animate__rollIn">
        <Wheel
          disableInitialAnimation={true}
          startingOptionIndex={0}
          mustStartSpinning={false}
          outerBorderWidth={1}
          outerBorderColor={"#eeeeee20"}
          innerRadius={2}
          innerBorderColor={"#00000020"}
          innerBorderWidth={1}
          radiusLineColor={"#00000020"}
          radiusLineWidth={1}
          textDistance={70}
          fontSize={15}
          data={_l}
        />
      </div>
    </>
  );
}

export default MNyWheel;
