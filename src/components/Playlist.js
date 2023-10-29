//Playlist.js
import React from 'react';
import Tracklist from './Tracklist';

function Playlist({ 
    playlistTracks, 
    onRemove, 
    onSave, 
    playlistName, 
    onNameChange, 
    onBackToPlaylists, 
    isEditing 
}) {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input 
        value={playlistName} 
        onChange={handleNameChange} 
        placeholder="Enter playlist name" 
      />
      <Tracklist
        tracks={playlistTracks}
        onRemove={onRemove}
        isPlaylist={true}
      />
      <br></br>
      <button className="SaveButton" onClick={onSave}>
  {isEditing ? "UPDATE PLAYLIST ON SPOTIFY" : "SAVE TO SPOTIFY"}
</button>
      {isEditing && <button className="BackButton" onClick={onBackToPlaylists}>BACK TO PLAYLISTS</button>}
    </div>
  );
}

export default Playlist;
