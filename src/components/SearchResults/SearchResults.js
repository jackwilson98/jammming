import React from "react";
import Track from "../Track/Track";

const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div>
      <h2>Results</h2>
      {searchResults.map(track => (
        <Track 
          key={track.id} 
          track={track} 
          onAdd={onAdd} 
          isRemoval={false} // Indicates this is for adding, not removing
        />
      ))}
    </div>
  );
};

export default SearchResults;
