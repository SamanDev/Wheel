import React from "react";
import ShowWheel from "./wheel/wheel";
import BottomWheel from "./wheel/bottom";
import InfoWheel from "./wheel/info";

function MNyWheel(prop) {
  return (
    <>
      <InfoWheel wheel={prop.wheel} />

      <ShowWheel wheel={prop.wheel} />

      <BottomWheel wheel={prop.wheel} />
    </>
  );
}

export default MNyWheel;
