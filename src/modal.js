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
  var userArr = wheel.wheelusers
    .filter((user) => user.username == username)
    .map((item, i) => {
      net = net + item.win;

      bets = bets + item.bet;
    });

  return [bets, net];
};
function ModalExampleModal(prop) {
  const [open, setOpen] = React.useState(false);
  const users = prop.wheel;
  const item = prop.wheel;
  console.log(users);
  var userBets = userBet(users, prop.loginToken.username);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      basic
      closeIcon={true}
      trigger={
        <Button size="mini" color="black">
          Show
        </Button>
      }
    >
      <div
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div
          className="info animate__fadeIn animate__animated  animate__delay-1s"
          style={{
            position: "absolute",
            color: "white",
            textAlign: "left",
            zIndex: 30,
            width: 150,

            lineHeight: "15px",
            padding: 10,
            transform: "scale(.6)",
            transformOrigin: "left top",
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
          }}
        >
          <Segment
            inverted
            size="mini"
            compact
            className="animate__slideInRight animate__animated info"
            style={{
              float: "left",
              backgroundColor: "transparent",
              width: 300,
              zIndex: 10,
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
        </div>
        <div className="animate__slideInLeft animate__animated">
          <Mywhell {...prop} last={true} />
        </div>
        <Segment color="black" inverted size="mini" className="res">
          <div className="table rsec">
            <List {...prop} last={true} startSpin={true} />
          </div>
        </Segment>
      </div>
    </Modal>
  );
}

export default ModalExampleModal;
