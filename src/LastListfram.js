import React, { useState, useEffect } from "react";
import { Table, Statistic, Label } from "semantic-ui-react";
import Mod from "./modal";
import ListService from "./services/list.service";
import { segments, getcolor, getcolortext } from "./utils/include";
const userBet = (wheel, username) => {
  var bets = 0;
  var net = 0;
  wheel.wheelusers
    .filter((user) => user.username == username)
    .map((item, i) => {
      net = net + item.win;

      bets = bets + item.bet;
    });

  return [bets, net];
};
const TableExampleSingleLine = (prop) => {
  const [lastList, setlastList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    ListService.getPublicContent({
      command: prop.command,
    }).then((response) => {
      setlastList(response.data);
    });
  }, [prop.command]);

  return (
    <Table
      unstackable
      inverted
      size="small"
      className="lasttable ltr"
      style={{ marginTop: 0 }}
    >
      <Table.Body>
        {lastList.map((item) => {
          var userBets = userBet(item, user?.username);
          return (
            <Table.Row key={item._id}>
              <Table.Cell>
                <Statistic color="violet" inverted size="mini">
                  <Statistic.Value>{item.total}</Statistic.Value>
                  <Statistic.Label>Bets</Statistic.Label>
                </Statistic>
                <Statistic
                  inverted
                  size="mini"
                  color={
                    parseFloat(item.net / item.total).toFixed(2) >= 1
                      ? "green"
                      : "red"
                  }
                >
                  <Statistic.Value>{item.net}</Statistic.Value>
                  <Statistic.Label>Win</Statistic.Label>
                </Statistic>
                <Statistic color="black" inverted>
                  <Statistic.Value>
                    <Label
                      style={{
                        background: getcolor(segments[item.number]),
                        color: getcolortext(segments[item.number]),
                      }}
                      size="small"
                      className="ltr"
                    >
                      {segments[item.number]}x
                    </Label>
                  </Statistic.Value>
                  <Statistic.Label></Statistic.Label>
                </Statistic>

                <Statistic
                  color={
                    parseFloat(userBets[0]).toFixed(2) > 0 ? "orange" : "grey"
                  }
                  inverted
                  size="mini"
                  style={
                    parseFloat(userBets[0]).toFixed(2) == 0
                      ? { opacity: 0.5 }
                      : { opacity: 1 }
                  }
                >
                  <Statistic.Value>{userBets[0]}</Statistic.Value>
                  <Statistic.Label>You</Statistic.Label>
                </Statistic>
                <Statistic
                  inverted
                  size="mini"
                  color={
                    parseFloat(userBets[1]) > parseFloat(userBets[0])
                      ? "green"
                      : parseFloat(userBets[0]).toFixed(2) > 0
                      ? "red"
                      : "grey"
                  }
                  style={
                    parseFloat(userBets[0]).toFixed(2) == 0
                      ? { opacity: 0.5 }
                      : { opacity: 1 }
                  }
                >
                  <Statistic.Value>{userBets[1]}</Statistic.Value>
                  <Statistic.Label>Win</Statistic.Label>
                </Statistic>

                <Mod wheel={item} user={user} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TableExampleSingleLine;
