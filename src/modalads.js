import React, { useEffect, useState } from "react";
import { Button, Modal, Segment, Icon, Divider } from "semantic-ui-react";
import UserService from "./services/user.service";
import EventBus from "./common/EventBus";
import ModalAds from "./modalvideo";
import { Jetton } from "./utils/include";
import { CopyToClipboard } from "react-copy-to-clipboard";
const gettokens = (id) => {
  UserService.gettokens(id).then((response) => {
    EventBus.dispatch("setuser", response.data);
  });
};
const getchips = (id) => {
  UserService.getchips(id).then((response) => {
    EventBus.dispatch("setuser", response.data);
  });
};
function ModalExampleModal(prop) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [link, setLink] = useState("");

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
    EventBus.on("user", (data) => {
      setUser(data);
      setOpen(false);
    });
    return () => {
      EventBus.remove("user");
    };
  }, []);

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
      trigger={
        <Button
          size="mini"
          style={{ display: "none" }}
          color="black"
          className="showads"
        >
          Show
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
        <lord-icon
          src="/assets/icon/lcwlrxqh.json"
          trigger="loop"
          colors="primary:#b4b4b4,secondary:#08a88a"
          style={{ width: 250, height: 250 }}
        ></lord-icon>
        <h1 className="text-center">LoW BaLanCe</h1>
        <Segment inverted size="mini">
          You can watch ads and get 1,000{" "}
          <span style={{ position: "relative", top: -1 }}>
            <Jetton />
          </span>{" "}
          for free.
          <br /> <br />
          <ModalAds
            disabled={loading}
            getchips={getchips}
            id={user.id}
            setOpenP={setOpen}
          />
          <Divider horizontal inverted>
            Or
          </Divider>
          {user?.tokens.length && (
            <>
              You have {user.tokens.length} tokens to use. each token will give
              you 5,000
              <span style={{ position: "relative", top: -1 }}>
                <Jetton />
              </span>{" "}
              <br /> <br />
              <Button
                color="teal"
                onClick={() => {
                  gettokens(user.tokens[0]);
                  setLoading(true);
                }}
                loading={loading}
                disabled={loading}
              >
                <Icon name="free code camp" />
                Use Token
              </Button>
              <Divider horizontal inverted>
                Or
              </Divider>
            </>
          )}
          Invite friends via your invite link and get 5,000{" "}
          <span style={{ position: "relative", top: -1 }}>
            <Jetton />
          </span>{" "}
          for each them.
          <br /> <br />
          <small className="text-muted">{link}</small>
          <br /> <br />
          <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
            <Button color={copied ? "green" : "youtube"}>
              <Icon name={copied ? "check" : "copy outline"} /> Copy Link
            </Button>
          </CopyToClipboard>
        </Segment>
      </div>
    </Modal>
  );
}

export default ModalExampleModal;
