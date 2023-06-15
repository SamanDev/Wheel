import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Segment,
  Icon,
  Divider,
  Dimmer,
} from "semantic-ui-react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ModalAds from "../modalvideo";
import { Jetton, formatDollar } from "../utils/include";

const getchips = (id) => {
  UserService.getchips(id).then((response) => {
    EventBus.dispatch("setuser", response.data);
  });
};
const olduser2 = JSON.parse(localStorage.getItem("user"));
function ModalExampleModal(prop) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openads, setOpenads] = useState(false);
  const [user, setUser] = useState(olduser2);
  const [link, setLink] = useState("");
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  useEffect(() => {
    var _link = window.location.href
      .toString()
      .replace("/play", "/invite/" + user.id);
    setLink(_link);
  }, [user]);
  useEffect(() => {
    if (wheel?.status == "Done") {
      const olduser = JSON.parse(localStorage.getItem("user"));

      setUser(olduser);
    }
  }, [wheel?.status]);
  useEffect(() => {
    EventBus.on("user", (data) => {
      setUser(data);
    });
    EventBus.on("balance", (data) => {
      const wheelb = JSON.parse(localStorage.getItem("wheel"));

      if (wheelb?.status != "Pending") {
        var newuser = olduser2;
        newuser.balance2 = data;
        setUser(newuser);
      }
    });
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    return () => {
      EventBus.remove("user");
      EventBus.remove("balance");
      EventBus.remove("wheel");
    };
  }, []);

  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      basic
      closeOnDimmerClick={true}
      closeIcon={true}
      trigger={
        <Icon circular inverted name="gift" color="red" id="showadsmod" />
      }
    >
      <Segment inverted size="mini" style={{ textAlign: "center" }}>
        <h3 className="text-center">Free chips</h3>
        <Divider />
        You can watch ads and get 1,000{" "}
        <span style={{ position: "relative", top: -1 }}>
          <Jetton />
        </span>{" "}
        for free, if your balance is less than 1,000.
        <Divider />
        <div
          style={user?.balance2 >= 1000 ? { color: "red" } : { color: "green" }}
        >
          Your balance is {formatDollar(user?.balance2)}{" "}
          <span style={{ position: "relative", top: -1 }}>
            <Jetton />
          </span>
          <br /> <br />
        </div>
        <Button
          color="facebook"
          disabled={user?.balance2 >= 1000}
          onClick={() => {
            setOpenads(true);
          }}
        >
          <Icon name="video" /> Watch Ads
        </Button>
      </Segment>
      <ModalAds
        open={openads}
        getchips={getchips}
        id={user.id}
        setOpenads={setOpenads}
        setOpen={setOpen}
      />
    </Modal>
  );
}

export default ModalExampleModal;
