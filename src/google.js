/*App.js*/

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { register, login } from "./actions/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Icon, Label } from "semantic-ui-react";
function App() {
  const [user, setUser] = useState(
    localStorage.getItem("guser")
      ? JSON.parse(localStorage.getItem("guser"))
      : null
  );
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loginOk = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => logOut(),
  });
  const handleLogin = (username, password) => {
    dispatch(login(username, password))
      .then(() => {
        setLoading(false);
        window.location.href = "/play";
      })
      .catch((err) => logOut());
  };
  const handleRegister = (username, email, password, image) => {
    const refer = localStorage.getItem("refer");
    dispatch(register(username, email, password, image, refer))
      .then(() => {
        handleLogin(username, password);
      })
      .catch((err) => logOut());
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
        .catch((err) => logOut());
    } else {
      logOut();
    }
  }, [user]);
  useEffect(() => {
    if (profile) {
      if (!localStorage.getItem("user")) {
        setLoading(true);
        dispatch(login(profile.name, profile.id))
          .then(() => {
            setLoading(false);
            //window.location.href = "/play";
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
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [profile]);
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem("user");
    localStorage.removeItem("users");
    localStorage.removeItem("guser");
    localStorage.removeItem("wheel");
  };
  if (loading) {
    return (
      <div className="navbar-nav ml-auto">
        <Button
          as="div"
          labelPosition="right"
          className="ltr"
          style={{ margin: "10px auto" }}
          disabled
          fluid
        >
          <Button color="red" fluid>
            <Icon name="spinner" loading />
            Please wait...
          </Button>
          <Label basic color="red" pointing="left">
            <Icon name="google" />
          </Label>
        </Button>
      </div>
    );
  }
  return (
    <div className="navbar-nav ml-auto">
      {profile ? (
        <>
          <Button
            as="div"
            to={"/play"}
            labelPosition="right"
            className="ltr"
            style={{ margin: "10px auto" }}
            fluid
          >
            <Button color="green" fluid as={Link} to={"/play"}>
              <Icon name="heart" />
              Wheel NOW!
            </Button>
            <Label
              color="black"
              pointing="left"
              onClick={() => {
                logOut();
              }}
            >
              <Icon name="log out" />
            </Label>
          </Button>
        </>
      ) : (
        <Button
          as="div"
          labelPosition="right"
          className="ltr"
          style={{ margin: "10px auto" }}
          onClick={() => loginOk()}
          fluid
        >
          <Button color="red" fluid>
            <Icon name="heart" />
            Sign in with GOOGLE
          </Button>
          <Label basic color="red" pointing="left">
            <Icon name="google" />
          </Label>
        </Button>
      )}
    </div>
  );
}
export default App;
