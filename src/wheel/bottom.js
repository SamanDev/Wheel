import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BetsWheel from "./bets";
import Google from "../google";
import { Segment, Dimmer, Icon, Header, Button } from "semantic-ui-react";
import ChipsWheel from "./chips";
import ChatWheel from "./chat";
import SendChatWheel from "./sendchat";
import EventBus from "../common/EventBus";
const GridExampleDividedPhrase = (prop) => {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 250
  );

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [balance, setBalance] = useState(user?.balance2);
  useEffect(() => {
    EventBus.on("user", (data) => {
      setBalance(data?.balance2);
    });

    return () => {
      EventBus.remove("user");
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);
  if (!user?.accessToken) {
    return (
      <>
        <Grid columns="three" style={{ position: "relative" }}>
          <div
            className="infobtn"
            style={{
              zIndex: 100,
              right: 10,
              left: 10,
              top: 0,
              bottom: 0,
              textAlign: "center",
              padding: 30,
              background: "rgb(131,58,180)",
              background:
                "linear-gradient(90deg, rgba(131,58,180,.1) 0%, rgba(253,29,29,.2) 50%, rgba(252,176,69,.1) 100%)",
            }}
          >
            <Header as="h5" icon inverted style={{ marginTop: 70 }}>
              <Icon name="user" color="grey" />
              Login with your Google account.
            </Header>
            <br />
            <Google />
          </div>
          <Grid.Row style={{ margin: 0 }}>
            <Grid.Column style={{ padding: 0 }}>
              <BetsWheel bet={bet} setBet={setBet} />
            </Grid.Column>
            <Grid.Column style={{ padding: 0 }}>
              <ChatWheel />
            </Grid.Column>
            <Grid.Column style={{ padding: 0 }}>
              <ChipsWheel bet={bet} setBet={setBet} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SendChatWheel disabled={true} />
      </>
    );
  }
  return (
    <>
      <Grid columns="three">
        <Grid.Row style={{ margin: 0 }}>
          <Grid.Column style={{ padding: 0 }}>
            <BetsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
          <Grid.Column style={{ padding: 0 }}>
            <ChatWheel />
          </Grid.Column>
          <Grid.Column style={{ padding: 0 }}>
            <ChipsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <SendChatWheel />
    </>
  );
};

export default GridExampleDividedPhrase;
