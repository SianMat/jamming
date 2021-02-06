import React from "react";

class SaveButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    document.getElementById("input-text").value = "";
    this.props.onSave(e);
  }

  render() {
    return (
      <button className="Playlist-save" onClick={this.handleSave}>
        SAVE TO SPOTIFY
      </button>
    );
  }
}

export default SaveButton;
