import React from "react";
import { Card, Button } from "semantic-ui-react";

const CardExampleCardProps = (prop) => (
  <Card
    className="ltr"
    header={prop.header}
    fluid
    extra={
      <>
        <div style={{ float: "left" }}>
          <lord-icon
            src="https://cdn.lordicon.com/uvpkeeul.json"
            trigger="morph"
            colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
            style={{ width: 25, height: 25 }}
          ></lord-icon>
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
