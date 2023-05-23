import React, { Component } from "react";
import { Menu, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default class MenuExampleVerticalText extends Component {
  state = { activeItem: "closest" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <>
        {" "}
        <Divider />
        <Menu text vertical fluid>
          <Menu.Item header>more...</Menu.Item>
          <Menu.Item name="Home" as={Link} to={"/"} />
          <Menu.Item name="About us" as={Link} to={"/about-us"} />
          <Menu.Item
            name="Terms Conditions"
            as={Link}
            to={"/terms-and-conditions"}
          />
          <Menu.Item name="Privacy Policy" as={Link} to={"/privacy-policy"} />
          <Menu.Item as={"div"} style={{ textAlign: "right" }}>
            Copyright &copy; 2023.
          </Menu.Item>
        </Menu>
      </>
    );
  }
}
