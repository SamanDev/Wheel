import React from "react";

import Menu from "./menu";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {
  var _link = window.location.href.toString().split("/");
  localStorage.setItem("refer", _link[_link.length - 1]);
  return <Navigate to="/" />;
};

export default Home;
