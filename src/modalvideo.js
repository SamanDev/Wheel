import React, { useEffect, useState } from "react";
import { Button, Modal, Icon, Progress, Segment } from "semantic-ui-react";

function ModalExampleModal(prop) {
  const [per, setPer] = useState(0);
  useEffect(() => {
    if (prop.open) {
      var pers = setInterval(() => {
        setPer((prev) => prev + 5);
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
      size="mini"
      closeOnDimmerClick={false}
      closeIcon={per >= 110 ? true : false}
      onClose={() => {
        prop.setOpenads(false);
        prop.setOpen(false);
      }}
    >
      <Progress percent={per} active color="green" attached="top" />
      <Segment inverted size="small" style={{ margin: 0 }}>
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client="ca-pub-3130483322710260"
          data-ad-slot="5693073868"
          data-auto-format="rspv"
          data-full-width=""
        >
          <div overflow=""></div>
        </amp-ad>
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
