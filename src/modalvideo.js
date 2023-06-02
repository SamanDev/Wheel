import React, { useState } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";

function ModalExampleModal(prop) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      basic
      size="mini"
      closeOnDimmerClick={true}
      trigger={
        <Button
          color="facebook"
          as="a"
          href="https://www.highrevenuegate.com/p0ake70i?key=6aeb751abc96aca5a39e514589a55682"
          target="_blank"
          onClick={() => {
            //setOpen(true);
            prop.getchips(prop.id);
            prop.setOpenP(false);
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
