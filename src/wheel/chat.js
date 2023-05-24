import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import Comment from "../utils/msg";

function ChatWheel(prop) {
  const [userbets, setuserbets] = useState([]);

  useEffect(() => {
    EventBus.on("chat", (data) => {
      if (data != []) {
        setuserbets((current) => [...current, data]);
      }
    });
    return () => {
      EventBus.off("chat");
    };
  }, []);
  useEffect(() => {
    document.getElementById("chatarea").scroll({
      top: userbets.length * 100,

      behavior: "smooth",
    });
  }, [userbets]);

  return (
    <div
      className="mainwheel"
      id="chatarea"
      style={{
        width: "130%",
        height: 260,
        overflow: "auto",
        marginTop: 30,
        overflowX: "hidden",
      }}
    >
      {userbets.map((cmd, i) => {
        console.log(cmd);
        return (
          <Comment
            key={i}
            username={cmd.username}
            image={cmd.image}
            txt={cmd.txt}
          />
        );
      })}
    </div>
  );
}

export default ChatWheel;
