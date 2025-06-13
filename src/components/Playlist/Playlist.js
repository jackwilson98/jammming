import React from "react";
import Track from "../Track/Track";

const Playlist = ({ playlistTracks, onRemove }) => {
  return (
    <div>
      <h2>Your Playlist</h2>
      {playlistTracks.map(track => (
        <Track 
          key={track.id} 
          track={track} 
          onRemove={onRemove} 
          isRemoval={true} // To indicate this track can be removed
        />
      ))}
    </div>
  );
};

export default Playlist;
