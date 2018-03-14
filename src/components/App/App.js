import React, {Component} from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';

export class App extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      isRemoval: true,
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
    };
  }

  addTrack(track) {
    let temp = this.state.playlistTracks.find(t => t.id === track.id);
    if (temp === undefined) {
      let newTracks = this.state.playlistTracks;
      newTracks.push(track);
      this.setState({
        playlistTracks: newTracks
      });
    }
  }

  removeTrack(track) {
    let temp = this.state.playlistTracks.filter(p => p.id !== track.id);
    this.setState({
      playlistTracks: temp
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(name, tracks) {
    Spotify.savePlaylist(name, tracks).then(name => {
      this.setState({
        playlistName: name,
        playlistTracks: []
      });
    })
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              isRemoval={this.state.isRemoval}
            />
          </div>
        </div>
      </div>
    );
  }
}
