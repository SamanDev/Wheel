import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Mywhell from "../Wheel";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        EventBus.dispatch("wheel", response.data.wheel);
        var _nu = response.data.user;
        var _ou = JSON.parse(localStorage.getItem("user"));
        _nu.accessToken = _ou.accessToken;
        localStorage.setItem("user", JSON.stringify(_nu));

        EventBus.dispatch("user", _nu);
        setContent(response.data);
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
        }
      }
    );
  }, []);
  if (content == "") {
    return null;
  }
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return <Mywhell currentUser={currentUser} wheel={content.wheel} />;
};

export default BoardUser;
