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

import $ from "jquery";
const getchips = (user, setOpen) => {
  if (user?.balance2 < 1000) {
    UserService.getchips().then((response) => {
      try {
        if (user?.username == response.data.username) {
          EventBus.dispatch("setuser", response.data);
        }
      } catch (error) {}
    });
  }

  setOpen(false);
};
const olduser2 = JSON.parse(localStorage.getItem("user"));
function ModalExampleModal(prop) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openads, setOpenads] = useState(false);
  const [user, setUser] = useState(olduser2);
  const [link, setLink] = useState("");
  const wheel = prop.wheel;

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
      .replace("/play", "/invite/" + user?.id);
    setLink(_link);
  }, [user]);
  useEffect(() => {
    if (wheel?.status != "Pending") {
      try {
        var newuser = JSON.parse(localStorage.getItem("user"));

        setUser(newuser);
      } catch (error) {
        setUser(null);
      }
    }
  }, [wheel?.status]);
  useEffect(() => {
    EventBus.on("user", (data) => {
      setUser(data);
    });
    EventBus.on("balance", (data) => {
      const wheelb = JSON.parse(localStorage.getItem("wheel"));

      if (wheelb?.status != "Pending") {
        try {
          var newuser = JSON.parse(localStorage.getItem("user"));
          newuser.balance2 = data;
          setUser(newuser);
        } catch (error) {
          setUser(null);
        }
      }
    });

    return () => {
      EventBus.remove("user");
      EventBus.remove("balance");
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
        <h3 className="text-center">Free Coin</h3>
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
            $("#playButton").trigger("click");
          }}
        >
          <Icon name="video" /> Watch Ads
        </Button>
        <Icon
          circular
          inverted
          name="gift"
          color="red"
          id="showadsmodget"
          style={{ position: "absolute", zIndex: -1 }}
          onClick={() => getchips(user, setOpen)}
        />
        <Icon
          circular
          inverted
          name="gift"
          color="red"
          id="showadsmodclose"
          style={{ position: "absolute", zIndex: -1 }}
          onClick={() => setOpen(false)}
        />
      </Segment>
      <ModalAds
        open={openads}
        getchips={getchips}
        id={user?.id}
        setOpenads={setOpenads}
        setOpen={setOpen}
      />
    </Modal>
  );
}

export default ModalExampleModal;
