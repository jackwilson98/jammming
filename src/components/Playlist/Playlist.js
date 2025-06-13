import React from "react";
import TrackList from "../TrackList/TrackList";

const Playlist = ({ playlistName, playlistTracks, onNameChange, onSave }) => {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div>
      <input value={playlistName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} />
      <button onClick={onSave}>Save to Spotify</button>
    </div>
  );
};

export default Playlist;
