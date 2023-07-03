import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BetsWheel from "./bets";
import Google from "../google";
import { Segment, Dimmer, Icon, Header, Button } from "semantic-ui-react";
import ChipsWheel from "./chips";
import ChatWheel from "./chat";
import SendChatWheel from "./sendchat";
const GridExampleDividedPhrase = (prop) => {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 250
  );
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);
  if (!user?.accessToken) {
    return (
      <>
        <Grid columns="three">
          <Grid.Row style={{ margin: 0 }}>
            <Grid.Column style={{ padding: 0 }}>
              <BetsWheel bet={bet} setBet={setBet} />
            </Grid.Column>
            <Grid.Column style={{ padding: 0 }}>
              <Header as="h5" icon inverted style={{ marginTop: 70 }}>
                <Icon name="user" color="grey" />
                Login with your Google account.
              </Header>
              <br />
              <Google />
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
