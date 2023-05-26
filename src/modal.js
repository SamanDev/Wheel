import React, { useState, useEffect } from "react";
import { Button, Modal, Segment, Statistic, Label } from "semantic-ui-react";
import List from "./List";
import Mywhell from "./wheel/showwheel";
import EventBus from "./common/EventBus";
import BetsWheel from "./wheel/showbets";
import { Jetton, userBet } from "./utils/include";
import Modalwin from "./wheel/modalshow";
import $ from "jquery";
var sortByZIndex = function (a, b) {
  return a.style.zIndex - b.style.zIndex;
};

function ModalExampleModal(prop) {
  const [open, setOpen] = React.useState(false);
  const users = prop.wheel;
  const item = prop.wheel;
  const [user, setUser] = useState(prop.user);

  var userBets = userBet(users, user?.username);
  useEffect(() => {
    var sorted = $(".modals").sort(sortByZIndex);
    $("body").append(sorted[0]);
  }, [open]);
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        basic
        closeIcon={true}
        trigger={
          <Button size="mini" color="black" className="show">
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
          <Segment
            inverted
            size="mini"
            compact
            className="animate__slideInRight animate__animated "
            style={{
              zIndex: 10,
              position: "absolute",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
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
          </Segment>
          <div className="animate__slideInLeft animate__animated">
            <Modalwin {...prop} />
            <BetsWheel {...prop} user={user} />
            <Mywhell {...prop} last={true} />
          </div>
          <Segment color="black" inverted size="mini" className="res">
            <div className="table rsec">
              <List {...prop} last={true} />
            </div>
          </Segment>
        </div>
      </Modal>
    </>
  );
}

export default ModalExampleModal;
