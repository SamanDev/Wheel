import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";

import Home from "./components/Home";

import About from "./components/About";
import Invite from "./components/Invite";
import Term from "./components/Term";
import Privacy from "./components/Privacy";
import BoardUser from "./components/BoardUser";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { startServiceWorker } from "./utils/include";

import EventBus from "./common/EventBus";
const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  }, [currentUser, logOut]);
  useEffect(() => {
    startServiceWorker();
    EventBus.on("setuser", (data) => {
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
        EventBus.dispatch("user", data);
      } else {
        const userOld = JSON.parse(localStorage.getItem("user"));
        if (userOld) {
          var _user = data;
          _user.accessToken = userOld.accessToken;
          _user.id = userOld.id;
          _user._id = userOld.id;
          localStorage.setItem("user", JSON.stringify(_user));

          EventBus.dispatch("user", _user);
        }
      }
    });
    return () => {
      EventBus.remove("setuser");
    };
  }, []);

  return (
    <Routes>
      <Route path="/play" element={<BoardUser />} />
      <Route path="/" element={<Home />} />
      <Route path="/invite/*" element={<Invite />} />
      <Route path="/login/:u/:p" element={<BoardUser />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/terms-and-conditions" element={<Term />} />
      <Route path="/privacy-policy" element={<Privacy />} />
    </Routes>
  );
};

export default App;
