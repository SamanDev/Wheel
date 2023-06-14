import React from "react";
import Chips from "./chips";

const GetChip = (prop) => {
  return <Chips className={prop.className} {...prop} />;
};

export default GetChip;
