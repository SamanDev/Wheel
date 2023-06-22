import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import CountWheel from "./count";

import Modalwin from "./modal";
import EventBus from "../common/EventBus";
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
var Seconds_Between_Dates = 0.2;
function MNyWheel() {
  const [wheel, setWheel] = useState();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const handleSpinClick = () => {
    if (!mustSpin) {
      if (wheel?.status != "Pending") {
        if (wheel?.status == "Spin") {
          const newPrizeNumber = parseInt(wheel?.number);
          Seconds_Between_Dates = 0.1;
          setPrizeNumber(newPrizeNumber);
          setMustSpin(true);
        }
      } else {
        const newPrizeNumber = parseInt(wheel?.startNum);
        Seconds_Between_Dates = 0.02;
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      }
    }
  };
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });

    return () => {
      EventBus.remove("wheel");
    };
  }, []);
  useEffect(() => {
    if (wheel?.status) {
      console.log(wheel);
      handleSpinClick();
    }
  }, [wheel]);

  if (!wheel?.status) {
    return (
      <div className="mainwheel mywhell animate__bounceIn animate__animated">
        <CountWheel wheel={wheel} />
      </div>
    );
  }

  return (
    <>
      <div className="mainwheel mywhell animate__rotateInDownRight animate__animated">
        <CountWheel wheel={wheel} />

        <Wheel
          data={_l}
          mustStartSpinning={mustSpin}
          outerBorderWidth={0}
          prizeNumber={prizeNumber}
          outerBorderColor={"#eeeeee"}
          innerRadius={10}
          innerBorderColor={"#000000"}
          innerBorderWidth={0}
          radiusLineColor={"#000000"}
          radiusLineWidth={0}
          textDistance={80}
          fontSize={20}
          spinDuration={parseFloat(Seconds_Between_Dates)}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          disableInitialAnimation={true}
        />

        <Modalwin wheel={wheel} />
      </div>
    </>
  );
}

export default MNyWheel;
