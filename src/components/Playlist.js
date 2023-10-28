//Playlist.js
import React from 'react';
import Tracklist from './Tracklist';

function Playlist() {
  return (
    <div className="Playlist">
      <h2>My Playlist</h2>
      <Tracklist />
      <button className="SaveButton">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
