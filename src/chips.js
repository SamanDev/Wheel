import React from "react";
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
            <small>$</small>
            {prop.num}
          </p>
          <lord-icon
            src="/swvqwdea.json"
            trigger="hover"
            scale="65"
            colors={prop.colors}
            style={{ width: 70, height: 70 }}
          ></lord-icon>
        </div>
      </div>
    </>
  );
}

export default App;
