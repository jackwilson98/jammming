import React from "react";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const handleAdd = () => {
    if (onAdd) {
      onAdd(track);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(track);
    }
  };

  return (
    <div>
      <p>
        <strong>{track.name}</strong> by {track.artist} — {track.album}
        {isRemoval ? (
          <button onClick={handleRemove} style={{ marginLeft: "10px" }}>-</button>
        ) : (
          <button onClick={handleAdd} style={{ marginLeft: "10px" }}>+</button>
        )}
      </p>
    </div>
  );
};

export default Track;
