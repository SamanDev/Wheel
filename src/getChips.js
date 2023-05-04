import React from "react";
import Chips from "./chips";

const GetChip = (prop) => {
  var bet = prop.chip;
  if (bet == 1)
    return (
      <Chips
        num="1"
        textColor="#000000"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#e4e4e4"
        {...prop}
      />
    );
  if (bet == 5)
    return (
      <Chips
        num="5"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#c71f16"
        textColor="#ffffff"
        {...prop}
      />
    );

  if (bet == 10)
    return (
      <Chips
        num="10"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#1663c7"
        textColor="#ffffff"
        {...prop}
      />
    );
  if (bet == 25)
    return (
      <Chips
        num="25"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#242424"
        textColor="#ffffff"
        {...prop}
      />
    );
  if (bet == 50)
    return (
      <Chips
        num="50"
        colors="outline:#b4b4b4,primary:#ffffff,secondary:#e8b730"
        textColor="#000000"
        {...prop}
      />
    );
};

export default GetChip;
