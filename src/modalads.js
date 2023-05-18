import React from "react";
import { Button, Modal, Segment, Statistic, Label } from "semantic-ui-react";
import AdsComponent from "./adsComponent";
import UserService from "./services/user.service";
import EventBus from "./common/EventBus";
const getchips = (id) => {
  UserService.getchips(id).then((response) => {
    EventBus.dispatch("user", response.data);
  });
};
function ModalExampleModal(prop) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => {
        getchips(prop.id);
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      basic
      closeIcon={false}
      closeOnDimmerClick={true}
      trigger={
        <Button size="mini" color="black" className="showads">
          Show
        </Button>
      }
    >
      <div
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <h1 className="text-center">ads</h1>
        <div className="adds">
          <AdsComponent dataAdSlot="X2XXXXXXXX8" />
        </div>
      </div>
    </Modal>
  );
}

export default ModalExampleModal;
