import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
  render() {
    let searchHeading = "";
    searchHeading = this.props.searchTerm ? `Results for... ${this.props.searchTerm}` : "Results";
    return (
      <div className="SearchResults">
        <h2>{searchHeading}</h2>
        <TrackList
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
}

export default SearchResults;
