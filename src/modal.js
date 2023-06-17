import React, { useState, useEffect } from "react";
import { Button, Modal, Segment, Statistic } from "semantic-ui-react";
import List from "./List";
import Mywhell from "./wheel/showwheel";
import { userBet, formatDollar } from "./utils/include";
import $ from "jquery";
import ListService from "./services/list.service";
var sortByZIndex = function (a, b) {
  return a.style.zIndex - b.style.zIndex;
};

function ModalExampleModal(prop) {
  const [open, setOpen] = React.useState(false);

  const [wheel, setWheel] = useState(prop.wheel);
  const item = prop.wheel;
  const [user, setUser] = useState(prop.user);

  var userBets = userBet(wheel, user?.username);
  useEffect(() => {
    var sorted = $(".modals").sort(sortByZIndex);
    $("body").append(sorted[0]);
    if (open) {
      ListService.getPublicContent({
        command: "wheelid&id=" + prop.wheel._id,
      }).then((response) => {
        setWheel(response.data);
        userBets = userBet(response.data, user?.username);
      });
    }
  }, [open]);
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        basic
        closeIcon={true}
        size="small"
        style={{
          height: "90vh",
          overflow: "hidden",
          width: 445,
          maxWidth: "90vw",
        }}
        trigger={
          <Button size="mini" color="black" className="show">
            Show
          </Button>
        }
      >
        <div
          style={{
            height: "90vh",
            overflow: "hidden",
            overflowY: "auto",
            width: 445,
            maxWidth: "90vw",
          }}
        >
          <Segment
            inverted
            size="mini"
            className="animate__slideInRight animate__animated "
            style={{
              textAlign: "center",
              overflow: "hidden",
            }}
          >
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
              <Statistic.Value>{formatDollar(userBets[0])}</Statistic.Value>
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
              <Statistic.Value>{formatDollar(userBets[1])}</Statistic.Value>
              <Statistic.Label>Win</Statistic.Label>
            </Statistic>
          </Segment>

          <Mywhell {...prop} last={true} />

          <Segment color="black" inverted size="mini" className="res">
            <div className="table rsec">
              <List {...prop} wheel={wheel} last={true} />
            </div>
          </Segment>
        </div>
      </Modal>
    </>
  );
}

export default ModalExampleModal;
