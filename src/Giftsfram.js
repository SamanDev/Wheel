import React from "react";

import { Card, Button, Icon, Image, Item, Label } from "semantic-ui-react";
import Product from "./product";
import { Jetton, formatDollar } from "./utils/include";
const CardGift = (prop) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Item style={{ backgroundColor: "#030c2c", color: "white" }}>
      <Item.Content>
        <Item.Header style={{ color: "white", width: "100%" }}>
          {prop.header}
          <span style={{ float: "right" }}>
            <Jetton /> {formatDollar(parseInt(prop.fee))}
          </span>
        </Item.Header>

        <Item.Extra>
          <Button
            primary
            size="mini"
            floated="left"
            onClick={() =>
              window.open("https://wheelofpersia.com/play", "play")
            }
          >
            Order Now
            <Icon name="right chevron" />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
const TableExampleSingleLine = (prop) => {
  return (
    <>
      <Item.Group divided>
        <CardGift header="Digikala Gift Cart 500,000T" fee={"180000"} />
        <CardGift header="Digikala Gift Cart 2,500,000T" fee={"890000"} />
        <CardGift header="Apple Store Gift Cart 10$" fee={"180000"} />
        <CardGift header="Apple Store Gift Cart 50$" fee={"890000"} />
        <CardGift header="Google Play Gift Cart 10$" fee={"180000"} />
        <CardGift header="Google Play Gift Cart 50$" fee={"890000"} />
      </Item.Group>
    </>
  );
};

export default TableExampleSingleLine;
