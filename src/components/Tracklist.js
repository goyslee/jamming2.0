//Tracklist.js
import React from 'react';

function Tracklist({ tracks, onAdd, onRemove, isPlaylist }) {
  return (
    <div className="Tracklist">
      {Array.isArray(tracks) && tracks.map(track => (
        <div key={track.id}>
          <h3>{track.name}</h3>
          <p>{track.artist}</p>
          <p>{track.album}</p>
          {isPlaylist ? (
            <button onClick={() => onRemove(track)}>Remove</button>
          ) : (
            <button onClick={() => onAdd(track)}>Add</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tracklist;



