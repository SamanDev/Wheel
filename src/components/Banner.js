import React from "react";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const s = document.createElement("script");
    s.type = "text/javascript";

    s.innerHTML =
      'atOptions = {"key" : "2a3b5b80dd801d12549da23d56bb7ff5","format" : "iframe","height" : 250,"width" : 300,"params" : {}};';
    this.instance.appendChild(s);
  }

  render() {
    return <div ref={(el) => (this.instance = el)} />;
  }
}
