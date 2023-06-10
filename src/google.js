/*App.js*/

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { register, login } from "./actions/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Button, Icon, Label } from "semantic-ui-react";
import { Navigate } from "react-router-dom";
const handleManifest = async (name, id) => {
  $('[rel="manifest"]').remove();
  if ($('[rel="manifest"]').length == 0) {
    let dd = window.location.protocol + "//" + window.location.host;
    let sUrl = dd + "/login/" + btoa(name) + "/" + btoa(id);

    let manifest = {
      short_name: "WheelofPersia",
      name: "Wheel of Persia",
      display: "fullscreen",
      orientation: "portrait",
      start_url: sUrl,
      scope: dd,
      id: sUrl,
      theme_color: "#000000",
      background_color: "#eeeeee",
      icons: [
        {
          src: dd + "/assets/logo192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any",
        },

        {
          src: dd + "/assets/logo.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any",
        },
      ],

      description:
        "Wheel of Persia, a free and non-gambling game where you pick numbers on a wheel.",
    };
    let content = encodeURIComponent(JSON.stringify(manifest));
    let url = "data:application/manifest+json," + content;
    let element = document.createElement("link");
    element.setAttribute("rel", "manifest");
    element.setAttribute("href", url);
    document.querySelector("head").appendChild(element);
  }
};
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
        handleManifest(username, password);
        //window.location.href = "/play";
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
            handleManifest(profile.name, profile.id);
            if (window.deferredPrompt) {
              setTimeout(() => {
                setLoading(true);
                $(".add-button").trigger("click");
              }, 3000);
            }
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
        //handleManifest(profile.name, profile.id);
      }
    } else {
      setLoading(false);
    }
  }, [profile]);
  useEffect(() => {
    if (window.location.href.toString().indexOf("/login/") > -1) {
      try {
        var arrAdd = window.location.href.toString().split("/");

        var _newValues = {};
        _newValues.name = atob(arrAdd[arrAdd.length - 2]);
        _newValues.id = atob(arrAdd[arrAdd.length - 1]);
        setProfile(_newValues);
        //handleLogin(_newValues.username, _newValues.id);
        //return <Navigate to="/" />;
      } catch (error) {}
    }
  }, []);
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
