// SearchResults.js
import React from 'react';
import Tracklist from './Tracklist';

function SearchResults({tracks}) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
          <Tracklist tracks={tracks} />
    </div>
  );
}

export default SearchResults;
