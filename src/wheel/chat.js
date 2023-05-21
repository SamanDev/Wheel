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
      document.getElementById("chatarea").scroll({
        top: userbets.length * 100,

        behavior: "smooth",
      });
    });
  }, []);

  return (
    <div
      className="mainwheel"
      id="chatarea"
      style={{
        width: "100%",
        height: 280,
        overflow: "auto",
        marginTop: 30,
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
