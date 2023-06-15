import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Jetton } from "./utils/include";
import $ from "jquery";
const CardExampleCardProps = (prop) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Card
      className="ltr"
      header={prop.header}
      fluid
      extra={
        <>
          <div style={{ float: "left", lineHeight: "22px" }}>
            <Jetton />
          </div>{" "}
          {prop.fee}{" "}
          {user?.accessToken ? (
            <Button
              color="orange"
              size="mini"
              floated="right"
              onClick={() => {
                alert(
                  "You don't have enough balance amount to order this item."
                );
              }}
            >
              Order Now
            </Button>
          ) : (
            <Button
              color="green"
              onClick={() => {
                $(".navbar-nav .button").trigger("click");
              }}
              size="mini"
              floated="right"
            >
              Login to order
            </Button>
          )}
        </>
      }
    />
  );
};

export default CardExampleCardProps;
