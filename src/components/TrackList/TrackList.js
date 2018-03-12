import React, { Component } from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
          {this.props.tracks.map((track, i) => {
            return (
              <Track 
                key={'track_' + i} 
                track={track}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
              />
            );

          })}
      </div>
    );
  }
}
