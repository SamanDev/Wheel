import React, { useEffect, useState } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";

function ModalExampleModal(prop) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        prop.getchips(prop.id);
      }}
      open={open}
      basic
      size="mini"
      closeOnDimmerClick={true}
      trigger={
        <Button
          color="facebook"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon name="video" /> Watch Ads
        </Button>
      }
    >
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          textAlign: "center",
        }}
      >
        <div id="mainContainer">
          <div id="content">
            <video id="contentElement" playsInline>
              <source src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4"></source>
            </video>
          </div>
          <div id="adContainer"></div>
        </div>
        <button id="playButton">Play</button>
      </div>
    </Modal>
  );
}

export default ModalExampleModal;
