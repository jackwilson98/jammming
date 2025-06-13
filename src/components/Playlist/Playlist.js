// src/components/Playlist/Playlist.js
import React from 'react';
import Track from '../Track/Track';

const Playlist = ({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) => {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input
        value={playlistName}
        onChange={handleNameChange}
        placeholder="Enter Playlist Name"
      />
      {playlistTracks.map(track => (
        <Track key={track.id} track={track} onRemove={onRemove} isRemoval={true} />
      ))}
      <button onClick={onSave}>Save to Spotify</button>
    </div>
  );
};

export default Playlist;
