import React from "react";
import { Tab } from "semantic-ui-react";
import LastList from "../Last";
import Leaders from "../Leaders";
import Gifts from "../Gifts";
const panes = [
  {
    menuItem: "جوایز",
    render: () => (
      <Tab.Pane attached={false}>
        <Gifts />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "لیدر ها",
    render: () => (
      <Tab.Pane attached={false}>
        <Leaders size="mini" command="leaders" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "آخرین",
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
