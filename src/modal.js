import React from "react";
import { Button, Modal, Segment, Statistic, Label } from "semantic-ui-react";
import List from "./List";
import Mywhell from "./ShowWheel";
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
const userBet = (wheel, username) => {
  var bets = 0;
  var net = 0;
  var userArr = wheel.users
    .filter((user) => user.username == username)
    .map((item, i) => {
      net = net + item.win;

      bets = bets + item.bet;
    });

  return [bets, net];
};
function ModalExampleModal(prop) {
  const [open, setOpen] = React.useState(false);
  const users = prop.users;
  const item = prop.users;
  var userBets = userBet(users, prop.loginToken.username);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      basic
      trigger={
        <Button size="mini" color="black">
          Show
        </Button>
      }
    >
      <div
        style={{
          height: 350,
          overflow: "hidden",
        }}
      >
        <div className="animate__slideInLeft animate__animated">
          <Mywhell {...prop} last={true} />
        </div>
      </div>
      <Segment
        color="black"
        inverted
        size="mini"
        className="res"
        style={{ marginTop: 0, margin: "0 10px" }}
      >
        <Segment
          inverted
          size="mini"
          compact
          className="animate__slideInRight animate__animated"
          style={{
            float: "right",
            backgroundColor: "transparent",
            width: 300,
          }}
        >
          <Statistic color="violet" inverted size="small">
            <Statistic.Value>${item.total}</Statistic.Value>
            <Statistic.Label>Bets</Statistic.Label>
          </Statistic>
          <Statistic
            inverted
            size="small"
            color={
              parseFloat(item.net / item.total).toFixed(2) >= 1
                ? "green"
                : "red"
            }
          >
            <Statistic.Value>${item.net}</Statistic.Value>
            <Statistic.Label>Win</Statistic.Label>
          </Statistic>
          <br />

          <Statistic
            color={parseFloat(userBets[0]).toFixed(2) > 0 ? "orange" : "grey"}
            inverted
            size="mini"
            style={
              parseFloat(userBets[0]).toFixed(2) == 0
                ? { opacity: 0.5 }
                : { opacity: 1 }
            }
          >
            <Statistic.Value>${userBets[0]}</Statistic.Value>
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
            <Statistic.Value>${userBets[1]}</Statistic.Value>
            <Statistic.Label>Win</Statistic.Label>
          </Statistic>
        </Segment>

        <List {...prop} last={true} startSpin={true} />
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
