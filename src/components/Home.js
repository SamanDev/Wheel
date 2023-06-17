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
            Hey there, welcome to <b>"Wheel of Persia"!</b> It's a cool game
            where you choose numbers on a wheel and if you hit the right one,
            you win more than what you bid. But wait, there's more! You can
            trade in your chips for actual prizes and open up new wheels to play
            on.
          </p>
          <p>
            It's all about being lucky, having a plan, and the excitement of
            winning big in "Wheel of Persia"!
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
