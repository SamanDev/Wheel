import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import $ from "jquery";
import CountWheel from "./count";

import Modalwin from "./modal";

import { segments, getcolor, getcolortext } from "../utils/include";

var _l = [];

segments.map((item, i) => {
  _l.push({
    option: "x" + item,
    style: {
      backgroundColor: getcolor(item),
      textColor: getcolortext(item),
    },
  });
});
var Seconds_Between_Dates = 0.1;
var myaudio = document.getElementById("backgroundMusic");
myaudio.playbackRate = 0.5;
function MNyWheel(prop) {
  const wheel = prop.wheel;
  const [mustspin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    if (wheel?.status) {
      if (wheel?.status == "Spin" && !mustspin) {
        /*    myaudio.play().catch((error) => {
          document.addEventListener(
            "click",
            () => {
              myaudio.play();
            },
            { once: true }
          );
        }); */
        var t1 = new Date(wheel?.date);
        var t2 = new Date();
        var dif = t2.getTime() - t1.getTime();

        var Seconds_from_T1_to_T2 = dif / 1000;
        Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

        Seconds_Between_Dates = 40 - Seconds_Between_Dates;

        Seconds_Between_Dates = Seconds_Between_Dates / 10;
        Seconds_Between_Dates = parseFloat(Seconds_Between_Dates).toFixed(2);
        console.log(Seconds_Between_Dates);
        if (Seconds_Between_Dates < 0.01) {
          Seconds_Between_Dates = 0.02;
        } else {
        }
        if (!mustspin) {
          setPrizeNumber(wheel?.number);
          setMustSpin(true);
        }
      } else {
        if (wheel?.status == "Pending") {
          setPrizeNumber(wheel?.startNum);
        } else {
          if (wheel?.status != "Spin") {
            $(".mainwheel .bhdLno").removeClass(
              "animate__flash animate__animated animate__faster"
            );
            setMustSpin(false);
            setPrizeNumber(wheel?.number);
          } else {
            //setMustSpin(false);
            var t1 = new Date(wheel?.date);
            var t2 = new Date();
            var dif = t2.getTime() - t1.getTime();

            var Seconds_from_T1_to_T2 = dif / 1000;
            Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

            Seconds_Between_Dates = 40 - Seconds_Between_Dates;

            Seconds_Between_Dates = Seconds_Between_Dates / 10;
            Seconds_Between_Dates = parseFloat(Seconds_Between_Dates).toFixed(
              2
            );
            console.log(Seconds_Between_Dates);
            if (Seconds_Between_Dates < 0.01) {
              Seconds_Between_Dates = 0.02;
            } else {
            }
            if (prizeNumber != wheel.number) {
              setPrizeNumber(wheel?.number);
            }
          }
        }
      }
      document.title = wheel.status + "...";
    }
  }, [wheel.status]);
  if (!wheel?.status || !wheel?.date) {
    return (
      <div className="mainwheel mywhell">
        <CountWheel wheel={wheel} />
        <div className="countover" style={{ filter: "blur(10px)", zIndex: 1 }}>
          <img src="/assets/cadr3.png" alt="card1" id="cadr" />
          <img src="/assets/cadr4.png" alt="card2" id="cadr2" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mainwheel mywhell">
        <CountWheel wheel={wheel} />
        <div className="countover">
          <img src="/assets/cadr3.png" alt="card1" id="cadr" />
          <img src="/assets/cadr4.png" alt="card2" id="cadr2" />
        </div>
        <div className="animate__animated  animate__rollIn">
          <Wheel
            data={_l}
            mustStartSpinning={mustspin}
            outerBorderWidth={0}
            prizeNumber={prizeNumber}
            startingOptionIndex={wheel?.startNum}
            outerBorderColor={"#eeeeee"}
            innerRadius={10}
            innerBorderColor={"#000000"}
            innerBorderWidth={0}
            radiusLineColor={"#000000"}
            radiusLineWidth={0}
            textDistance={80}
            fontSize={[20]}
            spinDuration={parseFloat(Seconds_Between_Dates)}
            onStopSpinning={() => {
              $(".mainwheel .bhdLno").addClass(
                "animate__flash animate__animated animate__faster"
              );
              setMustSpin(false);
            }}
          />
        </div>

        <Modalwin wheel={wheel} />

        <div className="ws"></div>
      </div>
    </>
  );
}

export default MNyWheel;
