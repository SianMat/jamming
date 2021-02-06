import React from "react";

class inputText extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  render() {
    return (
      <input
        id="input-text"
        placeholder={"New Playlist"}
        onChange={this.handleNameChange}
      />
    );
  }
}

export default inputText;
