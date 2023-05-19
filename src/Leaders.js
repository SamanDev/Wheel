import React, { useState, useEffect } from "react";
import { Table, Statistic, Label } from "semantic-ui-react";

import { Button, Image, List } from "semantic-ui-react";
import Mod from "./modal";
import ListService from "./services/list.service";
import EventBus from "./common/EventBus";
import { Jetton } from "./utils/include";

const TableExampleSingleLine = (prop) => {
  const [lastList, setlastList] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    ListService.getPublicContent({
      command: prop.command,
    }).then((response) => {
      setlastList(response.data);
    });
    return () => {
      setlastList([]);
    };
  }, [prop.command]);
  useEffect(() => {
    EventBus.on("user", (data) => {
      setUser(data);
    });
  }, []);
  return (
    <List divided verticalAlign="middle" className="ltr">
      {lastList.map((item) => {
        return (
          <List.Item key={item._id}>
            <Image avatar src={item.image} />
            <List.Content style={{ lineHeight: "25px" }}>
              <b>{item?.username}</b>
            </List.Content>
            <div
              style={{ float: "right", lineHeight: "25px", display: "flex" }}
            >
              {item?.balance2} <Jetton />
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};

export default TableExampleSingleLine;
