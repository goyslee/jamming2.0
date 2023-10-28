// SearchResults.js
import React from 'react';
import Tracklist from './Tracklist';

function SearchResults({ tracks, onAdd }) {
  console.log("In SearchResults, onAdd is:", typeof onAdd); // This should log "function"
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={tracks} onAdd={onAdd} />
    </div>
  );
}


export default SearchResults;
