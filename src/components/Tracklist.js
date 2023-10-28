import React from 'react';

function Tracklist({ tracks }) {
  return (
    <div className="Tracklist">
      {Array.isArray(tracks) && tracks.map(track => (
        <div key={track.id}>
          <h3>{track.name}</h3>
          <p>{track.artist}</p>
          <p>{track.album}</p>
        </div>
      ))}
    </div>
  );
}

export default Tracklist;
