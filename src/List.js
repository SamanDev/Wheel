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
} from "./utils/include";

const TableExampleSingleLine = (prop) => {
  const [wheel, setWheel] = useState(prop.wheel);
  const [userbets, setuserbets] = useState(prop.wheel?.wheelusers);
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
        stat.sort((a, b) => (a.win < b.win ? 1 : -1));
      }
    }

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
            <Table.HeaderCell>Bet {<>{wheel?.total}</>}</Table.HeaderCell>

            <Table.HeaderCell>Win {<>{wheel?.net}</>}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      <div className="tablelist">
        <Table unstackable inverted color="black" fixed>
          <Table.Body>
            {userbets?.length > 0 && (
              <>
                {list.map((item, i) => (
                  <Table.Row key={item.username + i}>
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
                        style={{ width: 40, display: "inline-block" }}
                      >
                        {item.bet}
                      </div>
                      <Label
                        style={{
                          background: getcolor(item.position),
                          color: getcolortext(item.position),
                        }}
                        size="small"
                      >
                        {item.position}x
                      </Label>
                    </Table.Cell>

                    <Table.Cell>
                      {wheel?.status == "Spining" || wheel?.status == "Done" ? (
                        <>
                          <Label
                            style={{
                              background: getcolor(
                                getPrize(segments[wheel.number], item.position)
                              ),
                              color: getcolortext(
                                getPrize(segments[wheel.number], item.position)
                              ),
                            }}
                            size="small"
                          >
                            {parseFloat(item.win)}
                          </Label>
                        </>
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
