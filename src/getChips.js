import React from "react";
import Chips from "./chips";

const GetChip = (prop) => {
  var bet = prop.chip;
  if (bet == 50) return <Chips {...prop} />;
  if (bet == 250) return <Chips {...prop} />;

  if (bet == 500) return <Chips {...prop} />;
  if (bet == 1000) return <Chips {...prop} />;
  if (bet == 5000) return <Chips {...prop} />;
};

export default GetChip;
