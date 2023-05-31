import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import EventBus from "../common/EventBus";
import CountWheel from "./count";
import Mod from "../modalads";
import Modalwin from "./modal";
import $ from "jquery";
import { segments, getcolor, getcolortext } from "../utils/include";
var _l = [];
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var degg = 360 / segments.length / 2 - 1;
var rndd = parseFloat(getRandomArbitrary(degg * -1, degg));
const updateWheel = (wheel2, rndd) => {
  const wheel = JSON.parse(localStorage.getItem("wheel"));
  if (!wheel?.status) return false;
  var t1 = new Date(wheel.date);
  var t2 = new Date();
  var dif = t1.getTime() - t2.getTime();

  var Seconds_from_T1_to_T2 = dif / 1000;
  var time = parseInt(Math.abs(Seconds_from_T1_to_T2));

  if (wheel?.status == "Spin") {
    $(".mainwheel .bhdLno canvas").css({
      transform:
        "rotate(-" +
        parseFloat(
          parseInt(wheel.number) * (360 / segments.length) +
            (40 - time) * 360 +
            rndd
        ).toFixed(2) +
        "deg)",
      transitionDuration: 40 - time + "s",
    });
  } else {
    if (wheel.status == "Pending") {
      if ($(".mainwheel .bhdLno canvas").attr("style")) {
        $(".mainwheel .bhdLno  canvas").css({
          transform:
            "rotate(-" +
            parseFloat(
              parseInt(wheel.startNum) * (360 / segments.length) + rndd
            ).toFixed(2) +
            "deg)",
          transitionDuration: "0s",
        });
      } else {
        $(".mainwheel .bhdLno  canvas").css({
          transform:
            "rotate(-" +
            parseFloat(
              parseInt(wheel.startNum) * (360 / segments.length) + rndd
            ).toFixed(2) +
            "deg)",
          transitionDuration: "0s",
        });
      }
    }
    if (wheel.status == "Done" || wheel?.status == "Spining") {
      if ($(".mainwheel .bhdLno canvas").attr("style")) {
        $(".mainwheel .bhdLno canvas").css({
          transform:
            "rotate(-" +
            parseFloat(
              parseInt(wheel.number) * (360 / segments.length) + rndd
            ).toFixed(2) +
            "deg)",
          transitionDuration: "0s",
        });
      } else {
        $(".mainwheel .bhdLno canvas").css({
          transform:
            "rotate(-" +
            parseFloat(
              parseInt(wheel.number) * (360 / segments.length) + rndd
            ).toFixed(2) +
            "deg)",
          transitionDuration: "1s",
        });
      }
    }
  }
  var colornum = getcolor(segments[wheel.startNum]);
  if (wheel.status == "Spin") {
    colornum = "#000000";
  }

  if (wheel.status != "Spin" && wheel.status != "Pending") {
    colornum = getcolor(segments[wheel.number]);
  }
  $(".mainwheel .bhdLno >div").css({
    filter: "drop-shadow(0px 0px 40px " + colornum + ")",
    zIndex: -1,
  });
};

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
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      setWheel(data);
    });
    setTimeout(() => {
      updateWheel(wheel, rndd);
    }, 100);
  }, []);

  useEffect(() => {
    if (wheel?.status == "Spin") {
      rndd = parseFloat(getRandomArbitrary(degg * -1, degg));
    }
    updateWheel(wheel, rndd);
  }, [wheel?.status]);

  return (
    <>
      <div
        className={
          wheel?.status == "Spin"
            ? "mainwheel mywhell mytrue"
            : "mainwheel mywhell"
        }
      >
        <div className="animate__animated  animate__rollIn">
          <CountWheel {...prop} />
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
          {wheel?.status && (
            <>
              <Modalwin />
              <Mod />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MNyWheel;
