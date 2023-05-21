import React from "react";
import { Grid, Image } from "semantic-ui-react";
import BetsWheel from "./bets";

import ChipsWheel from "./chips";
import ChatWheel from "./chat";
import SendChatWheel from "./sendchat";
const GridExampleDividedPhrase = (prop) => (
  <>
    <Grid columns="three" divided>
      <Grid.Row style={{ margin: 0 }}>
        <Grid.Column>
          <BetsWheel {...prop} />
        </Grid.Column>
        <Grid.Column>
          <ChatWheel />
        </Grid.Column>
        <Grid.Column>
          <ChipsWheel {...prop} />
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <SendChatWheel />
  </>
);

export default GridExampleDividedPhrase;
