import React from "react";
import { Tab } from "semantic-ui-react";
import LastList from "../Last";
import Leaders from "../Leaders";
import Gifts from "../Gifts";
const panes = [
  {
    menuItem: "Market",
    render: () => (
      <Tab.Pane attached={false}>
        <Gifts />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Leaders",
    render: () => (
      <Tab.Pane attached={false}>
        <Leaders size="mini" command="leaders" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Last",
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
