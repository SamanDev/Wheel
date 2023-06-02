import React, { useState } from "react";
import {
  Modal,
  Segment,
  Statistic,
  Image,
  Divider,
  Label,
} from "semantic-ui-react";

import {
  sumOfBet,
  sumOfWin,
  userBet,
  segments,
  getcolor,
  getcolortext,
  Jetton,
} from "../utils/include";
const bigWin = (list) => {
  var _l = list.sort((a, b) => (a.win < b.win ? 1 : -1));
  return _l[0];
};
const bigLose = (list) => {
  var _l = list
    .filter((user) => user.win == 0)
    .sort((a, b) => (a.bet < b.bet ? 1 : -1));

  return _l[0];
};
var bigwin, biglose;
function ModalExampleModal(prop) {
  const [open, setOpen] = useState(true);
  const [wheel, setWheel] = useState(prop.wheel);
  const [user, setUser] = useState(prop.user);
  const [bets, setbets] = useState(userBet(wheel, user?.username));
  const [userbets, setuserbets] = useState(wheel.wheelusers);
  const [userclass, setuserclass] = useState(
    "animate__backInUp animate__animated"
  );
  bigwin = bigWin(userbets);
  biglose = bigLose(userbets);
  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      basic
      size="mini"
      closeOnDimmerClick={true}
      closeIcon={true}
      className={userclass}
    >
      <Segment inverted size="mini">
        {sumOfWin(userbets) > 0 ? (
          <>
            <Image
              circular
              src={bigwin?.image}
              centered
              style={{ width: 150, height: 150 }}
            />
            <div
              style={{
                left: 0,
                right: 0,
                zIndex: 20,
                textAlign: "center",
              }}
            >
              <Statistic color="green" inverted size="mini">
                <Statistic.Value>Big Winner</Statistic.Value>
                <Statistic.Label>{bigwin?.username}</Statistic.Label>
                <Statistic.Value>
                  <Label
                    size="massive"
                    style={{
                      background: getcolor(bigwin?.position),
                      color: getcolortext(bigwin?.position),
                      margin: "10px 10px",
                      display: "block",
                      textAlign: "center",
                      lineHeight: "23px",
                    }}
                  >
                    {bigwin?.win}{" "}
                    <span
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 4,
                      }}
                    >
                      <Jetton />
                    </span>
                  </Label>
                  <Label
                    size="huge"
                    style={{
                      background: getcolor(bigwin?.position),
                      color: getcolortext(bigwin?.position),
                      margin: "10px 10px",
                      display: "block",
                      textAlign: "center",
                      lineHeight: "23px",
                    }}
                  >
                    {bigwin?.bet}{" "}
                    <span
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 4,
                      }}
                    >
                      <Jetton />
                    </span>{" "}
                    x{segments[wheel.number]}
                  </Label>
                </Statistic.Value>
              </Statistic>
            </div>
            <Divider />
          </>
        ) : (
          <>
            <Image
              src={
                bets[1] > 0
                  ? "/assets/win.jpg"
                  : bets[0] > 0
                  ? "/assets/lose.webp"
                  : "/assets/nobet.webp"
              }
              fluid
              circular
            />
            <Label
              style={{
                background: getcolor(segments[wheel.number]),
                color: getcolortext(segments[wheel.number]),
                margin: "0 30px",
                display: "block",
                textAlign: "center",
              }}
              size="massive"
            >
              x{segments[wheel.number]}
            </Label>
            <Divider />
          </>
        )}

        <div style={{ textAlign: "center" }}>
          {sumOfBet(userbets) > 0 && (
            <>
              {biglose?.username && (
                <>
                  <Statistic color="red" inverted size="mini">
                    <Statistic.Value>
                      <Image circular src={biglose?.image} centered />
                      Big Looser
                    </Statistic.Value>
                    <Statistic.Label>{biglose?.username}</Statistic.Label>
                    <Statistic.Value>
                      <Label
                        size="huge"
                        style={{
                          background: getcolor(biglose?.position),
                          color: getcolortext(biglose?.position),
                          margin: "10px 10px",
                          display: "block",
                          textAlign: "center",
                          lineHeight: "23px",
                        }}
                      >
                        {biglose?.bet}{" "}
                        <span
                          style={{
                            display: "inline",
                            position: "relative",
                            top: 4,
                          }}
                        >
                          <Jetton />
                        </span>{" "}
                        x{biglose?.position}
                      </Label>
                    </Statistic.Value>
                  </Statistic>
                  <Divider />
                </>
              )}
            </>
          )}
          {sumOfWin(userbets) == 0 && (
            <>
              <Statistic color="grey" inverted size="mini">
                <Statistic.Value>No Winner</Statistic.Value>
                <Statistic.Label>Try Again</Statistic.Label>
              </Statistic>{" "}
              <Divider />
            </>
          )}

          {bets[1] > 0 ? (
            <Statistic color="violet" inverted size="small">
              <Statistic.Value>{bets[1]}</Statistic.Value>
              <Statistic.Label>You Won</Statistic.Label>
              <Statistic.Value>
                <Label
                  size="huge"
                  style={{
                    background: getcolor(bigwin?.position),
                    color: getcolortext(bigwin?.position),
                    margin: "10px 10px",
                    display: "block",
                    textAlign: "center",
                    lineHeight: "23px",
                  }}
                >
                  {bets[1] / segments[wheel.number]}{" "}
                  <span
                    style={{
                      display: "inline",
                      position: "relative",
                      top: 4,
                    }}
                  >
                    <Jetton />
                  </span>{" "}
                  x{segments[wheel.number]}
                </Label>
              </Statistic.Value>
            </Statistic>
          ) : (
            bets[0] > 0 && (
              <Statistic color="red" inverted size="mini">
                <Statistic.Value>You Lose</Statistic.Value>
                <Statistic.Label>Sorry...</Statistic.Label>
                <Statistic.Value>
                  {bets[0]}{" "}
                  <span style={{ position: "relative", top: 4 }}>
                    <Jetton />
                  </span>
                </Statistic.Value>
              </Statistic>
            )
          )}
        </div>
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
