import React from "react";
import { Button, Comment, Form, Icon } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import $ from "jquery";
import socket from "../socket";
const addChat = (txt) => {
  if ($("#send").val() != "") {
    const user = JSON.parse(localStorage.getItem("user"));

    EventBus.dispatch("chat", {
      txt: txt,
      username: user.username,
      image: user.image,
    });
    socket.emit("addchat", {
      txt: txt,
      username: user.username,
      image: user.image,
    });
    $("#send").val("");
  }
};

const SendChatWheel = () => (
  <Comment.Group size="mini">
    <Comment>
      <Form
        onSubmit={() => {
          addChat($("#send").val());
        }}
        style={{ padding: "0 20px" }}
      >
        {" "}
        <Button
          style={{
            position: "absolute",
            right: "10px",
            zIndex: 100,
            border: "none",
            background: "transparent",
          }}
        >
          <Icon name="send" color="black" />
        </Button>
        <Form.Input id="send" placeholder="write here..." fluid />
      </Form>
    </Comment>
  </Comment.Group>
);

export default SendChatWheel;
