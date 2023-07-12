import React, { useState, useEffect } from "react";
import { Table, Statistic, Label } from "semantic-ui-react";
import Mod from "./modal";
import ListService from "./services/list.service";
import {
  segments,
  getcolor,
  getcolortext,
  formatDollar,
} from "./utils/include";
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
          //var userBets = userBet(item, user?.username);
          return (
            <Table.Row key={item._id}>
              <Table.Cell>
                <Statistic color="violet" inverted size="mini">
                  <Statistic.Value>{formatDollar(item.total)}</Statistic.Value>
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
                  <Statistic.Value>{formatDollar(item.net)}</Statistic.Value>
                  <Statistic.Label>Win</Statistic.Label>
                </Statistic>
                <Statistic color="black" inverted>
                  <Statistic.Value>
                    <Label
                      style={{
                        background: getcolor(segments[item.number]),
                        color: getcolortext(segments[item.number]),
                      }}
                      size="large"
                      className="ltr"
                    >
                      {segments[item.number]}x
                    </Label>
                  </Statistic.Value>
                  <Statistic.Label></Statistic.Label>
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
