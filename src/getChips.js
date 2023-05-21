import React from "react";
import Chips from "./chips";

const GetChip = (prop) => {
  var bet = prop.chip;
  if (bet == 50)
    return (
      <Chips
        num={bet}
        textColor="#000000"
        colors="outline:#b4b4b4,primary:#888888,secondary:#e4e4e4"
        stroke="100"
        {...prop}
      />
    );
  if (bet == 250)
    return (
      <Chips
        num={bet}
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#c71f16"
        textColor="#ffffff"
        stroke="100"
        {...prop}
      />
    );

  if (bet == 500)
    return (
      <Chips
        num={bet}
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#1663c7"
        textColor="#ffffff"
        stroke="100"
        {...prop}
      />
    );
  if (bet == 1000)
    return (
      <Chips
        num="1000"
        txt="1k"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#242424"
        textColor="#ffffff"
        stroke="100"
        {...prop}
      />
    );
  if (bet == 5000)
    return (
      <Chips
        num="5000"
        txt="5K"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#e8b730"
        textColor="#000000"
        stroke="100"
        {...prop}
      />
    );
};

export default GetChip;
