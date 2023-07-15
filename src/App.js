import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";

import Home from "./components/Home";
import ModMarket from "./market";
import Gifts from "./Giftsfram";
import About from "./components/About";
import Invite from "./components/Invite";
import Term from "./components/Term";
import Privacy from "./components/Privacy";
import BoardUser from "./components/BoardUser";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import Leaders from "./Leadersframe";
import LastList from "./LastListfram";

import EventBus from "./common/EventBus";
import { useWheel, useUser } from "./hooks/user.hooks";
const App = () => {
  const dispatch = useDispatch();
  const [wheel] = useWheel();

  let location = useLocation();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <Routes>
      <Route path="/" element={<BoardUser wheel={wheel} />} />
      <Route path="/play" element={<BoardUser wheel={wheel} />} />

      <Route path="/invite/*" element={<Invite />} />
      <Route path="/login/:u/:p" element={<BoardUser />} />
      <Route path="/leaders" element={<Leaders command="leaders" />} />
      <Route path="/best" element={<LastList command="winList" />} />
      <Route path="/market" element={<Gifts size="mini" command="leaders" />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/terms-and-conditions" element={<Term />} />
      <Route path="/privacy-policy" element={<Privacy />} />
    </Routes>
  );
};

export default App;
