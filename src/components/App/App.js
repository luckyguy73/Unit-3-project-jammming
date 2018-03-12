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
      searchResults: [
        {
          name: 'Beat It',
          artist: 'Michael Jackson',
          album: 'Thriller'
        },
        {
          name: 'Head Over Heels',
          artist: 'The Go-Go\'s',
          album: 'Talk Show'
        },
        {
          name: 'Smells Like Teen Spirit',
          artist: 'Nirvana',
          album: 'Nevermind'
        },
        {
          name: 'Welcome to the Jungle',
          artist: 'Guns N\' Roses',
          album: 'Appetite for Destruction'
        }
      ],
      playlistName: 'Megajams',
      playlistTracks: [
        {
          name: 'Beat It',
          artist: 'Michael Jackson',
          album: 'Thriller'
        },
        {
          name: 'Head Over Heels',
          artist: 'The Go-Go\'s',
          album: 'Talk Show'
        },
        {
          name: 'Smells Like Teen Spirit',
          artist: 'Nirvana',
          album: 'Nevermind'
        },
        {
          name: 'Welcome to the Jungle',
          artist: 'Guns N\' Roses',
          album: 'Appetite for Destruction'
        }
      ],
    };
  }

  addTrack(track) {
    // # 41
  }

  removeTrack(track) {
    // # 49
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(name, tracks) {
    Spotify.savePlaylist(name, tracks).then(name => {
      this.setState({
        playlistName: name,
        searchResults: []
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
            />
          </div>
        </div>
      </div>
    );
  }
}
