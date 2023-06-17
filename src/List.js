import React, { useEffect, useState } from "react";
import { Table, Label, Image } from "semantic-ui-react";
import EventBus from "./common/EventBus";
import ListService from "./services/list.service";
import {
  groupByMultipleFields,
  groupBySingleField,
  sumOfBet,
  sumOfWin,
  count,
  segments,
  getcolor,
  getcolortext,
  getPrize,
  formatDollar,
} from "./utils/include";

const TableExampleSingleLine = (prop) => {
  const [wheel, setWheel] = useState(prop.wheel);
  const [userbets, setuserbets] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState(prop.user);

  useEffect(() => {
    if (!prop.last) {
      ListService.getPublicContent({
        command: "users",
      }).then((response) => {
        setuserbets(response.data);
      });
    }
    return () => {
      if (!prop.last) {
        setuserbets([]);
      }
    };
  }, [prop.command]);
  useEffect(() => {
    if (prop.last) {
      setuserbets(prop.wheel.wheelusers);
    }
  }, [prop.wheel]);
  useEffect(() => {
    var stat = [];

    if (userbets?.length > 0) {
      var _gmode = groupByMultipleFields(userbets, "username", "position");
      for (const property in _gmode) {
        for (const pos in _gmode[property]) {
          stat.push({
            bet: sumOfBet(_gmode[property][pos]),

            position: parseInt(pos),
            username: property,
            image: _gmode[property][pos][0].image,
            win: sumOfWin(_gmode[property][pos]),
          });
        }
      }
      stat.sort((a, b) => (a.bet < b.bet ? 1 : -1));
      if (wheel?.status == "Spining" || wheel?.status == "Done") {
        stat.sort(function (a, b) {
          if (a.win === b.win) {
            // Price is only important when cities are the same
            return b.bet - a.bet;
          }
          return a.win < b.win ? 1 : -1;
        });
      }
    }
    console.log(stat);
    setList(stat);
  }, [userbets]);
  useEffect(() => {
    if (!prop.last) {
      EventBus.on("wheel", (data) => {
        setWheel(data);
      });
      EventBus.on("users", (data) => {
        setuserbets(data);
      });
      EventBus.on("bets", (data) => {
        if (data != []) {
          setuserbets((current) => [...current, data]);
        }
      });
      EventBus.on("resetusers", (data) => {
        setuserbets([]);
      });
      EventBus.on("user", (data) => {
        setUser(data);
      });
    }
    return () => {
      EventBus.remove("wheel");
      EventBus.remove("user");
      EventBus.remove("users");
      EventBus.remove("bets");
      EventBus.remove("resetusers");
    };
  }, []);
  return (
    <>
      <Table
        unstackable
        inverted
        color="violet"
        fixed
        size="small"
        style={{ marginTop: 0 }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Users {<>{count(groupBySingleField(userbets, "username"))}</>}
            </Table.HeaderCell>
            <Table.HeaderCell>
              Bet {<>{formatDollar(wheel?.total)}</>}
            </Table.HeaderCell>

            <Table.HeaderCell>
              Win {<>{formatDollar(wheel?.net)}</>}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      <div className="tablelist">
        <Table unstackable inverted color="black" fixed>
          <Table.Body>
            {userbets?.length > 0 && (
              <>
                {list.map((item, i) => (
                  <Table.Row
                    disabled={item.win == 0 ? true : false}
                    key={item.username + i}
                  >
                    <Table.Cell
                      style={
                        item.username == user?.username
                          ? item.win == 0
                            ? { color: "red" }
                            : { color: "gold" }
                          : { color: "gray" }
                      }
                    >
                      <b>{item.username}</b>
                      <Image
                        src={item.image}
                        alt={item.username + " image"}
                        circular
                        bordered
                        floated="left"
                        width="20"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <div
                        className="ltr"
                        style={{ width: 60, display: "inline-block" }}
                      >
                        {formatDollar(item.bet)}
                      </div>
                      <Label
                        style={{
                          background: getcolor(item.position),
                          color: getcolortext(item.position),
                        }}
                        size="mini"
                      >
                        x{item.position}
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      {wheel?.status == "Spining" || wheel?.status == "Done" ? (
                        <b>{formatDollar(item.win)}</b>
                      ) : (
                        <>-</>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default TableExampleSingleLine;
