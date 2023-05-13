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
        console.log(profile);
        dispatch(login(profile.name, profile.id))
          .then(() => {
            UserService.getUserBoard().then(
              (response) => {
                var _nu = response.data.user;
                var _ou = JSON.parse(localStorage.getItem("user"));
                _nu.accessToken = _ou.accessToken;
                localStorage.setItem("user", JSON.stringify(_nu));

                EventBus.dispatch("user", _nu);
              },
              (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                if (error.response.status === 403) {
                  EventBus.dispatch("logout");
                  logOut();
                }
              }
            );
            // return <Navigate to="/play" />;
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
        UserService.getUserBoard().then(
          (response) => {
            var _nu = response.data.user;
            var _ou = JSON.parse(localStorage.getItem("user"));
            _nu.accessToken = _ou.accessToken;
            localStorage.setItem("user", JSON.stringify(_nu));

            EventBus.dispatch("user", _nu);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            if (error.response.status === 403) {
              EventBus.dispatch("logout");
              logOut();
            }
          }
        );
      }
    }
  }, [profile]);
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/play" />;
  }
  return (
    <div>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <Link to={"/play"} className="nav-link">
            Play
          </Link>
        </div>
      ) : (
        <button onClick={() => loginOk()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default App;
