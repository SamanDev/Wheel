/*App.js*/

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { register, login } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const loginOk = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const handleLogin = (username, password) => {
    dispatch(login(username, password))
      .then(() => {
        window.location.href = "/";
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (user) {
      console.log(user);
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
    console.log(profile);
    if (profile) {
      dispatch(register(profile.name, profile.email, profile.id))
        .then(() => {
          handleLogin(profile.name, profile.id);
        })
        .catch(() => {
          handleLogin(profile.name, profile.id);
        });
    }
  }, [profile]);
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => loginOk()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default App;
