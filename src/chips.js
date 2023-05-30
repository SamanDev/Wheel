import React from "react";
const getColor = (num) => {
  if (num == "50") {
    return "white";
  }
  if (num == "250") {
    return "red";
  }
  if (num == "500") {
    return "blue";
  }
  if (num == "1000") {
    return "black";
  }
  if (num == "5000") {
    return "green";
  }
};
function App(prop) {
  return (
    <>
      <div
        onClick={() => {
          prop.setBet(prop.chip);
        }}
        style={prop.style}
        className={prop.bet == prop.chip ? "chips active" : "chips"}
      >
        <div
          className={"pokerchip " + getColor(prop.chip) + " " + prop.className}
        ></div>
      </div>
    </>
  );
}

export default App;
