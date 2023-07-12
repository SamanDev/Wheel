import React, { useEffect, useState } from "react";
import { Button, Modal, Segment, Icon, Divider } from "semantic-ui-react";
import Gifts from "./Gifts";

function ModalExampleModal(prop) {
  const [open, setOpen] = useState(false);
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
      trigger={<Icon name="cart" color="pink" circular inverted />}
    >
      <Segment inverted size="mini">
        <h3 className="text-center">Market</h3>
        <Divider />
        <div style={{ height: "400px", overflow: "auto" }}>
          <Gifts size="mini" command="leaders" inverted={true} />
        </div>
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
