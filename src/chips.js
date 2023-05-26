import React from "react";
import {
  sumOfBet,
  sumOfWin,
  userBet,
  segments,
  getcolor,
  getcolortext,
  Jetton,
} from "./utils/include";
function App(prop) {
  return (
    <>
      <div
        onClick={() => {
          prop.setBet(prop.num);
        }}
        style={prop.style}
        className={prop.bet == prop.num ? "chips active" : "chips"}
      >
        <div className={prop.className}>
          <p style={{ color: prop.textColor }}>
            {prop.txt ? prop.txt : prop.num}
          </p>
          <lord-icon
            src="/swvqwdea.json"
            trigger="hover"
            scale="65"
            colors={prop.colors}
            stroke={prop.stroke}
            style={{ width: 70, height: 70, zIndex: -1 }}
          ></lord-icon>
        </div>
      </div>
    </>
  );
}

export default App;
