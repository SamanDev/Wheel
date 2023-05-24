import React from "react";

import Menu from "./menu";

const Home = () => {
  return (
    <div className="home">
      <div className="cadr">
        <img src="/assets/logo.png" className="logo" />
        <div className="container">
          <p>
            Welcome to "Wheel of Persia," a thrilling and captivating game of
            chance and skill that offers endless excitement without any form of
            gambling. In this innovative game, contestants have the opportunity
            to select numbers on a magnificent wheel, and if luck is on their
            side and their chosen number emerges, they'll be rewarded with
            impressive multiples of their initial bid. What makes "Wheel of
            Persia" even more enticing is that it is entirely free to play!
            Contestants can accumulate chips and strategically cash them out to
            unlock new wheels, each presenting unique challenges and prizes that
            transcend the virtual realm and become real-life rewards. Prepare to
            embark on an exhilarating journey where luck meets strategy, and
            where triumph leads to tangible success in "Wheel of Persia."
          </p>

          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Home;
