import React from "react";
import { Button, Comment, Form, Icon } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import $ from "jquery";

import UserService from "../services/user.service";
const addChat = (txt) => {
  if ($("#send").val() != "") {
    const user = JSON.parse(localStorage.getItem("user"));
    var _d = {
      txt: txt,
      username: user.username,
      image: user.image,
    };

    UserService.addChat(_d).then((response) => {});

    $("#send").val("");
  }
};

const SendChatWheel = (prop) => (
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
          name="sendbtn"
          ariaLabelledby="send"
          disabled={prop.disabled}
        >
          <Icon name="send" color="black" />
        </Button>
        <Form.Input
          id="send"
          placeholder="write here..."
          disabled={prop.disabled}
          fluid
          name="sendinp"
        />
      </Form>
    </Comment>
  </Comment.Group>
);

export default SendChatWheel;
