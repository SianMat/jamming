// import logo from './logo.svg';
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import React from "react";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
      searchTerm: "",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks.slice();
    // if the track is already in the playlist, break out of the method
    if (playlist.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    //else add the track to the playlist
    playlist.push(track);
    this.setState({ playlistTracks: playlist });
    //remove the track from the search results as it is now in the playlist
    let searchResults = this.state.searchResults.slice();
    searchResults = searchResults.filter(
      (currentTrack) => currentTrack.id !== track.id
    );
    this.setState({
      searchResults: searchResults,
    });
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks.slice();
    this.setState({
      playlistTracks: playlist.filter(
        (savedTrack) => savedTrack.id !== track.id
      ),
    });
    //add track into top of current search results list
    let searchResults = this.state.searchResults.slice();
    searchResults.unshift(track);
    this.setState({
      searchResults: searchResults,
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    if (!this.state.playlistTracks.length) {
      alert("Nothing to save, add some songs.");
      return;
    }
    if (!this.state.playlistName) {
      alert("Give your playlist a name");
      return;
    }
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then((searchResults) => {
      //filter search results to remove any tracks already in playlist
      searchResults = searchResults.filter((track) => {
        let newTrack = true;
        this.state.playlistTracks.forEach((addedTrack) => {
          if (addedTrack.id === track.id) {
            newTrack = false;
          }
        });
        return newTrack;
      });

      this.setState({ searchResults: searchResults, searchTerm: searchTerm });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              searchTerm={this.state.searchTerm}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("load", () => {
      Spotify.getAccessToken();
    });
  }
}

export default App;
