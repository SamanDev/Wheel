import React from "react";

import "../home.css";
import Google from "../google";
import AdsComponent from "../adsComponent";
import List from "./List";

const Home = () => {
  return (
    <div className="home" style={{ padding: 15 }}>
      <div className="slider-thumb">
        <img src="/assets/logo.png" className="logo" />
        <div className="container">
          <h1>رایگان بازی کن. هر جایزه ای دوست داری ببر!</h1>
          <p>
            «چرخ شانس» یک بازی کاملا مجانی با قوانین ساده است که در آن
            شرکت‌کنندگان می‌توانند با انتخاب یکی از اعداد موجود بر روی چرخ، شانس
            خود را برای بردن جایزه امتحان کنند.
          </p>
          <p>
            در صورتی که شماره انتخابی آنها با شماره‌ای که بر روی چرخ مشخص شده
            است برابر باشد، آنها برنده ضریبی از آن شماره خواهند شد.
          </p>
          <p>
            این بازی به صورت رایگان برگزار می‌شود و هیچگونه ارتباطی با قمار
            ندارد.
          </p>
          <p>
            {" "}
            جوایز این بازی واقعی هستند و برندگان در بخش جوایز. می‌توانند ژتون
            های خود را به هدیه ها تبدیل کنند.
          </p>
          <Google />
          <List />
          <div className="adds">
            <AdsComponent dataAdSlot="X2XXXXXXXX" />
          </div>
          <h1>رایگان بازی کن. هر جایزه ای دوست داری ببر!</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
