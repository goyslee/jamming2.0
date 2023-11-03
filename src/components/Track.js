// Track.js
import React from 'react';

function Track({ track, onAdd }) {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
        {track.preview_url && <audio controls src={track.preview_url}>Preview not available</audio>}
      </div>
      <button className="Track-action" onClick={() => onAdd(track)}>+</button>
    </div>
  );
}


export default Track;
