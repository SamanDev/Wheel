import React, { useState, useEffect } from "react";

import { Image, List, Dimmer, Loader, Segment } from "semantic-ui-react";
import ListService from "./services/list.service";
import { formatDollar } from "./utils/include";
const TableExampleSingleLine = (prop) => {
  const [lastList, setlastList] = useState([]);

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
  if (lastList.length == 0) {
    return (
      <Segment inverted={true} basic style={{ height: 500 }}>
        <Dimmer active inverted={true} style={{ backgroundColor: "#030c2c" }}>
          <Loader size="large" inverted={true}>
            Loading
          </Loader>
        </Dimmer>
      </Segment>
    );
  }

  return (
    <List
      divided
      verticalAlign="middle"
      className="ltr"
      celled
      style={{ backgroundColor: "#030c2c", color: "white" }}
      inverted={true}
    >
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
              {formatDollar(item?.balance2)}{" "}
              <img src={"/assets/chip.svg"} style={{ width: 25, height: 25 }} />
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};

export default TableExampleSingleLine;
