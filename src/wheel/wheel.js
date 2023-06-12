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
var degg = parseFloat(360 / segments.length / 2 - 1.21).toFixed(2);
//console.log(degg);
var rndd = parseFloat(getRandomArbitrary(degg * -1, degg));
//var rndd = parseFloat(degg);
const updateWheel = (wheel, rndd) => {
  if (wheel?.status) {
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
            parseInt(wheel.number) * (360 / segments.length) + rndd
          ).toFixed(2) +
          "deg)",
        transitionDuration: 39 - time + "s",
      });
    } else {
      if (wheel.status == "Pending") {
        if ($(".mainwheel .bhdLno canvas").attr("style")) {
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(wheel.startNum) * (360 / segments.length) + rndd
              ).toFixed(2) +
              "deg)",
            transitionDuration: "1s",
          });
        } else {
          $(".mainwheel .bhdLno canvas").css({
            transform:
              "rotate(-" +
              parseFloat(
                parseInt(wheel.startNum) * (360 / segments.length) + rndd
              ).toFixed(2) +
              "deg)",
            transitionDuration: "1s",
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
    var colornum = " 10px solid " + getcolor(segments[wheel.startNum]);
    if (wheel.status == "Spin") {
      colornum = "2px solid #000000";
    }

    if (wheel.status != "Spin" && wheel.status != "Pending") {
      colornum = " 10px solid " + getcolor(segments[wheel.number]);
    }
    $(".mainwheel .bhdLno >div").css({
      border: colornum,
      zIndex: 1,
    });
  }
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
function checkbox() {
  var c2 = $("#cadr").attr("src2");
  $("#cadr").attr("src2", $("#cadr").attr("src"));
  $("#cadr").attr("src", c2);
}
var lighter;
function MNyWheel(prop) {
  const [wheel, setWheel] = useState({});

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    if (wheel?.status) {
      setTimeout(() => {
        updateWheel(wheel, rndd);
      }, 2000);
    }
    return () => {
      EventBus.remove("wheel");
      setWheel({});
    };
  }, []);

  useEffect(() => {
    if (wheel?.status) {
      clearInterval(lighter);
      if (wheel?.status == "Spin") {
        lighter = setInterval(() => {
          checkbox();
        }, 1500);
        rndd = parseFloat(getRandomArbitrary(degg * -1, degg));
      } else {
        lighter = setInterval(() => {
          checkbox();
        }, 5000);
      }
      updateWheel(wheel, rndd);
    }
  }, [wheel?.status]);

  return (
    <>
      <div className={"mainwheel mywhell"}>
        <div className="animate__animated  animate__rollIn">
          <CountWheel {...prop} />
          <div className="countover">
            <img src="/assets/cadr.png" src2="/assets/cadr2.png" id="cadr" />
          </div>

          <Wheel
            startingOptionIndex={0}
            mustStartSpinning={false}
            outerBorderWidth={0}
            outerBorderColor={"#eeeeee20"}
            innerRadius={10}
            innerBorderColor={"#00000020"}
            innerBorderWidth={0}
            radiusLineColor={"#00000020"}
            radiusLineWidth={0}
            textDistance={80}
            fontSize={20}
            data={_l}
          />

          {wheel?.status && wheel?.status != "Spin" && (
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
