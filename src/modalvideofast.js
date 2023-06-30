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
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <img src="/assets/sepi.png" style={{ margin: "auto" }} />
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5068963892927255"
          data-ad-slot="3043056885"
          data-ad-format="auto"
          height="800"
          width="360"
          type="adsense"
          data-full-width-responsive="true"
        ></ins>
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
