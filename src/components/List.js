import React from "react";
import { Tab, Menu } from "semantic-ui-react";
import LastList from "../Last";
import Leaders from "../Leaders";
import Gifts from "../Gifts";
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const panes = [
  {
    menuItem: (
      <Menu.Item as="div" key="Market" style={{ cursor: "pointer" }}>
        Market
      </Menu.Item>
    ),

    render: () => (
      <Tab.Pane attached={false}>
        <Gifts />
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item as="div" key="Leaders" style={{ cursor: "pointer" }}>
        Leaders
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <Leaders size="mini" command="leaders" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item as="div" key="Last" style={{ cursor: "pointer" }}>
        Last
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <LastList size="mini" command="lastList" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item as="div" key="Best" style={{ cursor: "pointer" }}>
        Best
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <LastList size="mini" command={"winList&u=" + user?.username} />
      </Tab.Pane>
    ),
  },
];

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
);

export default TabExampleSecondaryPointing;
