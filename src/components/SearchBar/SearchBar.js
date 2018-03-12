import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(term) {
    this.props.onSearch(term);
  }

  handleTermChange(e) {
    e.preventDefault();
    this.search(document.getElementById('search').value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input id='search' placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleTermChange} >SEARCH</a>
      </div>
    );
  }
}

