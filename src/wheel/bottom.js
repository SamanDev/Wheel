import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BetsWheel from "./bets";
import Google from "../google";
import {
  Segment,
  Dimmer,
  Icon,
  Header,
  Button,
  Modal,
  Divider,
} from "semantic-ui-react";
import ChipsWheel from "./chips";
import ChatWheel from "./chat";
import SendChatWheel from "./sendchat";
import { useUser } from "../hooks/user.hooks";
const GridExampleDividedPhrase = (prop) => {
  const [bet, setBet] = useState(250);
  const [open, setOpen] = useState(true);
  const [user] = useUser();

  return (
    <>
      {!user?.accessToken && (
        <>
          <Modal
            open={!user?.accessToken && open}
            onClose={() => {
              setOpen(false);
            }}
            onOpen={() => setOpen(true)}
            basic
            dimmer="blurring"
            size="mini"
            closeOnDimmerClick={true}
            closeIcon={true}
          >
            <div
              className="infobtn3"
              style={{
                zIndex: 10000,
                right: 10,
                left: 10,
                top: -140,

                textAlign: "center",
                padding: "80px 10px",
                margin: 10,
                borderRadius: 10,
                opacity: 0.8,
                background: "rgb(0,0,0)",
                boxShadow: "0 0 10px 0px rgba(0,0,0,1)",
                background:
                  "linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)",
              }}
            >
              <Header as="p" icon inverted style={{ fontSize: 14 }}>
                <Icon name="user" inverted />
                Login with your Google account.
              </Header>
              <br />
              <Google />
            </div>
          </Modal>
        </>
      )}
      <Grid
        columns="three"
        style={{ position: "relative" }}
        onClick={() => setOpen(true)}
      >
        <Grid.Row style={{ margin: 0 }}>
          <Grid.Column style={{ padding: 0 }}>
            <BetsWheel bet={bet} setBet={setBet} wheel={prop.wheel} />
          </Grid.Column>
          <Grid.Column style={{ padding: 0 }}>
            <ChatWheel />
          </Grid.Column>
          <Grid.Column style={{ padding: 0 }}>
            <ChipsWheel
              bet={bet}
              setBet={setBet}
              wheel={prop.wheel}
              user={user}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <SendChatWheel disabled={!user?.accessToken} />
    </>
  );
};

export default GridExampleDividedPhrase;
