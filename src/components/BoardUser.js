import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Mywhell from "../Wheel";
const BoardUser = () => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
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
          window.location.href = "/login";
        }
      }
    );
  }, []);
  if (content == "") {
    return null;
  }
  return <Mywhell currentUser={content.user} wheel={content.wheel} />;
};

export default BoardUser;
