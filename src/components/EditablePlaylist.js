//EditablePlaylist.js 
import React from 'react';
import Tracklist from './Tracklist';

function EditablePlaylist({ playlistTracks, onRemove, onSave, playlistName, onNameChange, onBackToPlaylists }) {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="EditablePlaylist">
      <button onClick={onBackToPlaylists}>Back to Playlists</button>
      <input 
        value={playlistName} 
        onChange={handleNameChange} 
        placeholder="Enter playlist name" 
      />
      <Tracklist
        tracks={playlistTracks}
        onRemove={track => {
          const updatedTracks = playlistTracks.filter(t => t.id !== track.id);
          onRemove(updatedTracks);
        }}
        isPlaylist={true}
      />
      <button className="SaveButton" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default EditablePlaylist;
