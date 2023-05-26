import React from "react";
import { Card, Button } from "semantic-ui-react";
import {
  sumOfBet,
  sumOfWin,
  userBet,
  segments,
  getcolor,
  getcolortext,
  Jetton,
} from "./utils/include";
const CardExampleCardProps = (prop) => (
  <Card
    className="ltr"
    header={prop.header}
    fluid
    extra={
      <>
        <div style={{ float: "left" }}>
          <Jetton />
        </div>{" "}
        {prop.fee}{" "}
        <Button color="orange" size="mini" floated="right">
          Order Now
        </Button>
      </>
    }
  />
);

export default CardExampleCardProps;
