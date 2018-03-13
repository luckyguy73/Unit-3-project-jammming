import React, { Component } from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  handleSave(e) {
    e.preventDefault();
    this.props.onSave(this.props.playlistName, this.props.playlistTracks);
  }

  render() {
    return (
      <div className="Playlist">
        <input 
          type='search'
          defaultValue={'New Playlist'}
          onChange={this.handleNameChange}
        />
        <TrackList 
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
        />
        <a className="Playlist-save"
          onClick={this.handleSave}
        >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
