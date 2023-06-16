import React from "react";

import "../home.css";
import Google from "../google";
import AdsComponent from "../adsComponent";
import List from "./List";
import Menu from "./menu";

const Home = () => {
  return (
    <div className="home">
      <div className="slider-thumb"></div>
      <div className="cadr">
        <img
          src="/assets/logo.png"
          width="220"
          height="220"
          alt="Wheel of Persia"
          className="logo"
        />
        <div className="container">
          <p>
            Welcome to "Wheel of Persia," a <b>free and non-gambling game</b>{" "}
            where you pick numbers on a wheel. If your number hits, you win
            multiples of your bid. But here's the twist: you can cash out your
            chips for real prizes and unlock new wheels.
          </p>
          <p>
            It's all about <b>luck, strategy, and the thrill of winning</b> big
            in <b>"Wheel of Persia"!</b>
          </p>

          <Google />
          <div>
            <AdsComponent dataAdSlot="6044212052" />
          </div>
          <List />
          <div>
            <AdsComponent dataAdSlot="6044212052" />
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Home;
