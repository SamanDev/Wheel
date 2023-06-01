import React from "react";
import { Tab, Menu } from "semantic-ui-react";
import LastList from "../Last";
import Leaders from "../Leaders";
import Gifts from "../Gifts";
const panes = [
  {
    menuItem: (
      <Menu.Item as="div" key="Market">
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
      <Menu.Item as="div" key="Leaders">
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
      <Menu.Item as="div" key="Last">
        Last
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <LastList size="mini" command="lastList" />
      </Tab.Pane>
    ),
  },
];

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
);

export default TabExampleSecondaryPointing;
