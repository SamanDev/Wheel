import React, { useEffect, useState } from "react";
import { Button, Modal, Icon, Progress, Segment } from "semantic-ui-react";

function ModalExampleModal(prop) {
  const [per, setPer] = useState(0);
  useEffect(() => {
    if (prop.open) {
      var pers = setInterval(() => {
        setPer((prev) => prev + 20);
      }, 1000);
    } else {
      setPer(0);
    }

    return () => {
      clearInterval(pers);
    };
  }, [prop.open]);
  useEffect(() => {
    if (per == 100) {
      prop.getchips(prop.id);
    }
  }, [per]);
  return (
    <Modal
      open={prop.open}
      basic
      size="fullscreen"
      closeOnDimmerClick={false}
      closeIcon={per >= 110 ? true : false}
      onClose={() => {
        prop.setOpenads(false);
        prop.setOpen(false);
      }}
    >
      <Progress percent={per} active color="green" attached="top" />
      <Segment inverted size="small" style={{ margin: 0 }}></Segment>
    </Modal>
  );
}

export default ModalExampleModal;
