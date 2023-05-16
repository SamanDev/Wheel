import React, { useEffect, useState } from "react";
import { Table, Label, Image } from "semantic-ui-react";
import EventBus from "./common/EventBus";
import ListService from "./services/list.service";
function groupBySingleField(data, field) {
  return data.reduce((acc, val) => {
    const rest = Object.keys(val).reduce((newObj, key) => {
      if (key !== field) {
        newObj[key] = val[key];
      }
      return newObj;
    }, {});
    if (acc[val[field]]) {
      acc[val[field]].push(rest);
    } else {
      acc[val[field]] = [rest];
    }
    return acc;
  }, {});
}
function groupByMultipleFields(data, ...fields) {
  if (fields.length === 0) return;
  let newData = {};
  const [field] = fields;
  newData = groupBySingleField(data, field);
  const remainingFields = fields.slice(1);
  if (remainingFields.length > 0) {
    Object.keys(newData).forEach((key) => {
      newData[key] = groupByMultipleFields(newData[key], ...remainingFields);
    });
  }
  return newData;
}
const sumOfBet = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.bet;
    return sum + _am;
  }, 0);
};
const sumOfWin = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.win;
    return sum + _am;
  }, 0);
};
function count(obj) {
  var count = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ++count;
    }
  }
  return count;
}
const TableExampleSingleLine = (prop) => {
  const [wheel, setWheel] = useState(prop.wheel);
  const [userbets, setuserbets] = useState(wheel?.wheelusers);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (!prop.last) {
      ListService.getPublicContent({
        command: "users",
      }).then((response) => {
        setuserbets(response.data);
      });
    }
    return () => {
      setuserbets([]);
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
        if (data?.status) {
          setWheel(data);
        }
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
    }
    return () => {
      if (!prop.last) {
        EventBus.remove("resetusers");
        EventBus.remove("users");
        EventBus.remove("bets");
        EventBus.remove("wheel");
      }
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
              Users{" "}
              {userbets?.length > 0 &&
                count(groupBySingleField(userbets, "username")) > 0 && (
                  <>{count(groupBySingleField(userbets, "username"))}</>
                )}
            </Table.HeaderCell>
            <Table.HeaderCell>
              Bet{" "}
              {userbets?.length > 0 && wheel?.total > 0 && <>${wheel?.total}</>}
            </Table.HeaderCell>

            <Table.HeaderCell>Win</Table.HeaderCell>
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
                        item.username == prop.loginToken.username
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
                      <div style={{ width: 40, display: "inline-block" }}>
                        ${item.bet}
                      </div>
                      <Label
                        style={{
                          background: prop.getcolor(item.position),
                          color: prop.getcolortext(item.position),
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
                              background: prop.getcolor(
                                prop.getPrize(
                                  prop.segments[wheel.number],
                                  item.position
                                )
                              ),
                              color: prop.getcolortext(
                                prop.getPrize(
                                  prop.segments[wheel.number],
                                  item.position
                                )
                              ),
                            }}
                            size="small"
                          >
                            ${parseFloat(item.win)}
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
