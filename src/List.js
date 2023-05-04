import React, { useEffect, useState } from "react";
import { Table, Label } from "semantic-ui-react";

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
  const bets = prop.users ? prop.users : prop.wheelusers;
  const [list, setList] = useState([]);

  useEffect(() => {
    var stat = [];

    var _gmode = groupByMultipleFields(bets?.users, "username", "position");
    for (const property in _gmode) {
      for (const pos in _gmode[property]) {
        stat.push({
          bet: sumOfBet(_gmode[property][pos]),
          status: _gmode[property].status,
          position: parseInt(pos),
          username: property,
          win: sumOfWin(_gmode[property][pos]),
        });
      }
    }
    stat.sort((a, b) => (a.bet < b.bet ? 1 : -1));
    if (bets.status == "Spining" || bets.status == "Done") {
      stat.sort((a, b) => (a.win < b.win ? 1 : -1));
    }

    setList(stat);
  }, [bets]);
  if (bets.status == "") return null;

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
              {bets &&
                count(groupBySingleField(bets?.users, "username")) > 0 && (
                  <>{count(groupBySingleField(bets?.users, "username"))}</>
                )}
            </Table.HeaderCell>
            <Table.HeaderCell>
              Bet {bets && bets.total > 0 && <>${bets.total}</>}
            </Table.HeaderCell>

            <Table.HeaderCell>Win</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      <div className="tablelist">
        <Table unstackable inverted color="black" fixed>
          <Table.Body>
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
                    {bets.status == "Spining" || bets.status == "Done" ? (
                      <>
                        <Label
                          style={{
                            background: prop.getcolor(
                              prop.getPrize(
                                prop.segments[bets.number],
                                item.position
                              )
                            ),
                            color: prop.getcolortext(
                              prop.getPrize(
                                prop.segments[bets.number],
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
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default TableExampleSingleLine;
