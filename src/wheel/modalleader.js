import React, { useEffect, useState } from "react";
import { Button, Modal, Segment, Icon, Divider } from "semantic-ui-react";
import Leaders from "../Leaders";

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
      trigger={<Icon name="angellist" color="purple" circular inverted />}
    >
      <Segment inverted size="mini">
        <h3 className="text-center">Leaders</h3>
        <Divider />
        <Leaders size="mini" command="leaders" inverted={true} />
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
