import React, { useState, useEffect } from "react";
import { Label } from "semantic-ui-react";

import { List } from "semantic-ui-react";
import Mod from "./modal";
import ListService from "./services/list.service";
import EventBus from "./common/EventBus";
import { userBet, count, groupBySingleField } from "./utils/include";

import { segments, getcolor, getcolortext, UsersIcon } from "./utils/include";
const printnum = (prop) => {
  if (prop == 0) return <>-</>;
  if (prop > 0) return <>+{prop}</>;
  if (prop < 0) return <>{prop}</>;
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
                <UsersIcon />{" "}
                {<>{count(groupBySingleField(item?.wheelusers, "username"))}</>}{" "}
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
                  {printnum(userBets[1] - userBets[0])}
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
