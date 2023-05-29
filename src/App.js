import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import Invite from "./components/Invite";
import Term from "./components/Term";
import Privacy from "./components/Privacy";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { startServiceWorker } from "./utils/include";

import EventBus from "./common/EventBus";
import { socket } from "./socket";
const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

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
    EventBus.on("connect", (data) => {
      socket.emit("getwheel");
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
        var _user = data;
        _user.accessToken = userOld.accessToken;
        _user.id = userOld.id;
        _user._id = userOld.id;
        localStorage.setItem("user", JSON.stringify(_user));

        EventBus.dispatch("user", _user);
      }
    });
    return () => {
      EventBus.remove("setuser");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invite/*" element={<Invite />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/terms-and-conditions" element={<Term />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/play" element={<BoardUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/admin" element={<BoardAdmin />} />
    </Routes>
  );
};

export default App;
