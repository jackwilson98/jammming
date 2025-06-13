import React from "react";
import Track from "../Track/Track";

const Playlist = ({ playlistName, playlistTracks, onRemove, onNameChange }) => {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={playlistName}
        onChange={handleNameChange}
        placeholder="Enter Playlist Name"
        style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
      />
      {playlistTracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onRemove={onRemove}
          isRemoval={true}
        />
      ))}
      <button>Save to Spotify</button>
    </div>
  );
};

export default Playlist;
