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
          src: "assets/logo.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      descriptin:
        "Wheel of Persia, a free and non-gambling game where you pick numbers on a wheel.",
    };
    let content = encodeURIComponent(JSON.stringify(manifest));
    let url = "data:application/manifest+json," + content;
    let element = document.createElement("link");
    element.setAttribute("rel", "manifest");
    element.setAttribute("href", url);
    document.querySelector("head").appendChild(element);
  }
  const addBtn = document.querySelector(".add-button");

  addBtn.addEventListener("click", async () => {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    console.log("👍", promptEvent);
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  });
  window.addEventListener("appinstalled", () => {
    window.deferredPrompt = null;
  });
  if (window.deferredPrompt) {
    setTimeout(() => {
      $(".add-button").trigger("click");
    }, 1000);
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
  if (window.location.href.toString().indexOf("/login/") > -1) {
    if (profile == null) {
      try {
        var arrAdd = window.location.href.toString().split("/");

        var _newValues = {};
        _newValues.username = atob(arrAdd[arrAdd.length - 2]);
        _newValues.password = atob(arrAdd[arrAdd.length - 1]);
        handleLogin(_newValues.username, _newValues.password);
        return <Navigate to="/" />;
      } catch (error) {}
    }
  }

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
