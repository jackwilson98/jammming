import React from "react";

const Track = ({ track }) => {
  return (
    <div>
      <p>
        <strong>{track.name}</strong> by {track.artist} — {track.album}
      </p>
    </div>
  );
};

export default Track;
