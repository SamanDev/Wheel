import React from "react";
import ShowWheel from "./wheel/wheel";
import BottomWheel from "./wheel/bottom";
import InfoWheel from "./wheel/info";

function MNyWheel(prop) {
  return (
    <>
      <InfoWheel {...prop} />

      <ShowWheel wheel={prop.wheel} />

      <BottomWheel {...prop} />
    </>
  );
}

export default MNyWheel;
