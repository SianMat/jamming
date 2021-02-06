import React from "react";
import TrackList from "../TrackList/TrackList";
import InputText from "./inputText";
import SaveButton from "./SaveButton";
import "./Playlist.css";

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <InputText  onNameChange={this.props.onNameChange} />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <SaveButton onSave={this.props.onSave} />
      </div>
    );
  }
}
export default Playlist;
