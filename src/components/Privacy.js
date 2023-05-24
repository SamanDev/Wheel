import React from "react";

import Menu from "./menu";

const Home = () => {
  return (
    <div className="home">
      <div className="cadr">
        <img src="/assets/logo.png" className="logo" />
        <div className="container">
          <p>
            <b>OVERVIEW – PLAY NICE</b>
          </p>
          <p>
            <span>
              Loole Technologies, Inc. “Loole.gg” (formerly known as XY Gaming)
              strives to provide a fair and equitable system for all our users.
              We endeavor to treat our clients as we would like to be treated
              and expect all our clients to treat each other with respect and
              honesty. If you attempt to cheat or break the rules, we will not
              only remove you from the system, but also ban you and prosecute to
              the full extend allowable at law, which may include civil actions
              &amp; criminal charges.
            </span>
          </p>

          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Home;
