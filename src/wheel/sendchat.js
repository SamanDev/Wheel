import React from "react";
import { Button, Comment, Form } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import $ from "jquery";
import { socket } from "../socket";
const addChat = (txt) => {
  console.log(txt);
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
};
const SendChatWheel = () => (
  <Comment.Group size="mini">
    <Comment>
      <Form
        onSubmit={() => {
          addChat($("#send").val());
        }}
      >
        <Form.Input id="send" fluid />
        <Button
          name="txt"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
          style={{ display: "none" }}
        />
      </Form>
    </Comment>
  </Comment.Group>
);

export default SendChatWheel;
