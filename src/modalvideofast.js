import React, { useEffect, useState } from "react";
import { Button, Modal, Icon, Progress, Segment } from "semantic-ui-react";

function ModalExampleModal(prop) {
  const [per, setPer] = useState(0);
  useEffect(() => {
    if (prop.open) {
      var pers = setInterval(() => {
        setPer((prev) => prev + 20);
      }, 500);
    } else {
      setPer(0);
    }

    return () => {
      clearInterval(pers);
    };
  }, [prop.open]);

  return (
    <Modal
      open={prop.open}
      basic
      size="fullscreen"
      closeOnDimmerClick={false}
      closeIcon={per >= 110 ? true : false}
      onClose={() => {
        prop.setOpen(false);
      }}
    >
      <Progress percent={per} active color="green" attached="top" />
      <Segment inverted size="small" style={{ margin: 0 }}>
        <amp-ad
          layout="fixed"
          width="360"
          height="800"
          type="adsense"
          data-ad-client="ca-pub-3130483322710260"
          data-ad-slot="5227020060"
        ></amp-ad>
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
