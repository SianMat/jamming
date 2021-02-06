import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
    this.search = this.search.bind(this);
    this.keySearch = this.keySearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    document.getElementById("search-bar").value = "";
    this.props.onSearch(this.state.term);
  }

  keySearch(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          id="search-bar"
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress={this.keySearch}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}
export default SearchBar;
