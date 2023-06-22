import React, { useState, useEffect } from "react";
import { Label } from "semantic-ui-react";

import { List, Dimmer, Loader, Segment } from "semantic-ui-react";
import Mod from "./modal";
import ListService from "./services/list.service";
import EventBus from "./common/EventBus";
import {
  userBet,
  count,
  groupBySingleField,
  formatDollar,
} from "./utils/include";

import { segments, getcolor, getcolortext, UsersIcon } from "./utils/include";
const printnum = (prop) => {
  if (prop == 0) return <>-</>;
  if (prop > 0) return <>+{formatDollar(prop)}</>;
  if (prop < 0) return <>{formatDollar(prop)}</>;
};
const TableExampleSingleLine = (prop) => {
  const userld = JSON.parse(localStorage.getItem("user"));
  const [lastList, setlastList] = useState([]);
  const [user, setUser] = useState(userld);
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
    return () => {
      EventBus.remove("user");
    };
  }, []);
  if (lastList.length == 0) {
    return (
      <Segment basic style={{ height: 300 }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }
  return (
    <List divided verticalAlign="middle" className="ltr">
      {lastList.map((item) => {
        var userBets = userBet(item, user?.username);
        return (
          <List.Item key={item._id} style={{ position: "relative" }}>
            <List.Content className="ltr">
              <div
                style={{ float: "left", lineHeight: "25px", display: "flex" }}
              >
                <Label
                  style={{
                    background: getcolor(segments[item.number]),
                    color: getcolortext(segments[item.number]),
                    width: 50,
                    textAlign: "center",
                  }}
                  className="ltr"
                >
                  {segments[item.number]}x
                </Label>
                <UsersIcon /> {<>{item?.wheelusers.length}</>}{" "}
              </div>
              <div
                style={{ float: "right", lineHeight: "25px", display: "flex" }}
              >
                <Label
                  style={
                    userBets[1] - userBets[0] >= 0
                      ? {
                          color: "green",
                        }
                      : { color: "red" }
                  }
                  size="small"
                  className="ltr"
                >
                  {printnum(item.net)}
                </Label>
              </div>
            </List.Content>

            <Mod wheel={item} user={user} />
          </List.Item>
        );
      })}
    </List>
  );
};

export default TableExampleSingleLine;
