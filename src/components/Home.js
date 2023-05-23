import React from "react";

import "../home.css";
import Google from "../google";
import AdsComponent from "../adsComponent";
import List from "./List";
import Menu from "./menu";

const Home = () => {
  return (
    <div className="home">
      <div className="cadr">
        <div className="slider-thumb"></div>
        <img src="/assets/logo.png" className="logo" />
        <div className="container">
          <p>
            Welcome to "Wheel of Persia," a <b>free and non-gambling game</b>{" "}
            where you pick numbers on a wheel. If your number hits, you win
            multiples of your bid. But here's the twist: you can cash out your
            chips for real prizes and unlock new wheels. It's all about luck,
            strategy, and the thrill of winning big in "Wheel of Persia"!
          </p>
          <p>
            It's all about <b>luck, strategy, and the thrill of winning</b> big
            in "Wheel of Persia"!
          </p>

          <Google />
          <div className="adds">
            <AdsComponent dataAdSlot="X2XXXXXXXX" />
          </div>
          <List />
          <div className="adds">
            <AdsComponent dataAdSlot="X2XXXXXXXX" />
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Home;
