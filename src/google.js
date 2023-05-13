/*App.js*/

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { register, login } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import UserService from "./services/user.service";
import EventBus from "./common/EventBus";
import { socket } from "./socket";
function App() {
  const [user, setUser] = useState(
    localStorage.getItem("guser")
      ? JSON.parse(localStorage.getItem("guser"))
      : null
  );
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const loginOk = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const handleLogin = (username, password) => {
    dispatch(login(username, password))
      .then(() => {
        return <Navigate to="/play" />;
        //window.location.href = "/";
      })
      .catch(() => {});
  };
  const handleRegister = (username, email, password, image) => {
    dispatch(register(username, email, password, image))
      .then(() => {
        handleLogin(username, password);
      })
      .catch(() => {});
  };
  function onConnect() {
    socket.on("msg", ({ command, data }) => {
      if (command == "update") {
        // setWheel(data);
        EventBus.dispatch("wheel", data);
      }
      if (command == "users") {
        EventBus.dispatch("users", data);
      }
      if (command == "bets") {
        EventBus.dispatch("bets", data);
      }
      if (command == "resetusers") {
        EventBus.dispatch("resetusers");
      }
      if (command == "user") {
        EventBus.dispatch("user", data);
      }

      if (command == "disconnect") {
        socket.disconnect();
      }
    });
  }

  socket.on("connect", onConnect);
  useEffect(() => {
    if (user) {
      localStorage.setItem("guser", JSON.stringify(user));

      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    if (profile) {
      if (!localStorage.getItem("user")) {
        dispatch(login(profile.name, profile.id))
          .then(() => {
            socket.connect();
          })
          .catch(() => {
            handleRegister(
              profile.name,
              profile.email,
              profile.id,
              profile.picture
            );
          });
      } else {
        socket.connect();
      }
    } else {
    }
  }, [profile]);
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem("user");
    localStorage.removeItem("guser");
  };

  return (
    <div className="navbar-nav ml-auto">
      {profile ? (
        <>
          <li className="nav-item">
            <Link to={"/play"} className="nav-link">
              Play
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} className="nav-link" onClick={() => logOut()}>
              LogOut
            </Link>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <Link to={"/"} as="a" className="nav-link" onClick={() => loginOk()}>
            Sign in with Google 🚀
          </Link>
        </li>
      )}
    </div>
  );
}
export default App;
