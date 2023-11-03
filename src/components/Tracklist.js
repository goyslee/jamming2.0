//Tracklist.js
//Tracklist.js
import React from 'react';

function Tracklist({ tracks, onAdd, onRemove, isPlaylist }) {
  return (
    <div className="Tracklist">
      {Array.isArray(tracks) && tracks.map(track => (
        <div key={track.id} className="Track">
          <div className="Track-details">
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
          </div>
          <button 
            className="Track-action" 
            onClick={isPlaylist ? () => onRemove(track) : () => onAdd(track)}
          >
            {isPlaylist ? '-' : '+'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tracklist;
