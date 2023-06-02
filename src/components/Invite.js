import React from "react";

import { Navigate } from "react-router-dom";
const Home = () => {
  var _link = window.location.href.toString().split("/");
  localStorage.setItem("refer", _link[_link.length - 1]);
  return <Navigate to="/" />;
};

export default Home;
