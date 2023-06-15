import React, { useEffect, useState } from "react";
import { Button, Modal, Segment, Icon, Divider } from "semantic-ui-react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { Jetton, formatDollar } from "../utils/include";
import { CopyToClipboard } from "react-copy-to-clipboard";
const gettokens = (id) => {
  UserService.gettokens(id).then((response) => {
    EventBus.dispatch("setuser", response.data);
  });
};
const olduser2 = JSON.parse(localStorage.getItem("user"));
function ModalExampleModal(prop) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(olduser2);
  const [link, setLink] = useState("");
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));

  var ivlink = {};
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
    if (open) {
      ivlink = {
        title: "Wheel of Persia",
        text: "Hi.\nJoin me here\n" + _link,
        url: _link,
      };
      const btn = document.getElementById("sharethis");
      if (navigator.share && btn) {
        btn.addEventListener("click", async () => {
          try {
            await navigator.share(ivlink);
            setOpen(false);
          } catch (err) {
            //resultPara.textContent = `Error: ${err}`;
          }
        });
      } else {
        try {
          btn.remove();
        } catch (err) {
          //resultPara.textContent = `Error: ${err}`;
        }
      }
      // Share must be triggered by "user activation"
    }
  }, [user, open]);

  useEffect(() => {
    setLoading(false);
    setOpen(false);
  }, [user?.tokens.length]);
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
      basic
      size="mini"
      closeOnDimmerClick={true}
      closeIcon={true}
      trigger={<Icon name="user plus" color="blue" circular inverted />}
    >
      <Segment inverted size="mini" style={{ textAlign: "center" }}>
        {user?.tokens.length > 0 && (
          <>
            <h3 className="text-center">Use Your Tokens</h3>
            <Divider />
            You have {user.tokens.length} tokens to use. each token will give
            you 5,000
            <span style={{ position: "relative", top: -1 }}>
              <Jetton />
            </span>
            , if your balance is less than 5,000.
            <br /> <br />
            <div
              style={
                user?.balance2 >= 5000 ? { color: "red" } : { color: "green" }
              }
            >
              Your balance is {formatDollar(user?.balance2)}
              <span style={{ position: "relative", top: -1 }}>
                <Jetton />
              </span>
              <br /> <br />
            </div>
            <Button
              color="teal"
              onClick={() => {
                gettokens(user.tokens[0]);
                setLoading(true);
              }}
              loading={loading}
              disabled={loading || user?.balance2 >= 5000}
            >
              <Icon name="free code camp" />
              Use Token
            </Button>
            <Divider horizontal inverted>
              Or
            </Divider>
          </>
        )}
        <h3 className="text-center">Invite friends</h3>
        <Divider />
        Invite friends via your invite link and get 5,000{" "}
        <span style={{ position: "relative", top: -1 }}>
          <Jetton />
        </span>{" "}
        for each of them.
        <br /> <br />
        <small className="text-muted">{link}</small>
        <br />
        <Divider hidden />
        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
          <Button color={copied ? "green" : "youtube"}>
            <Icon name={copied ? "check" : "copy outline"} /> Copy Link
          </Button>
        </CopyToClipboard>
        <br />
        <Button color={"green"} style={{ marginTop: 20 }} id="sharethis">
          <Icon name="share alternate" /> Share Link
        </Button>
      </Segment>
    </Modal>
  );
}

export default ModalExampleModal;
