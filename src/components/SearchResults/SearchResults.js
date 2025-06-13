import React from "react";
import Track from "../Track/Track";

const SearchResults = ({ searchResults }) => {
  return (
    <div>
      <h2>Results</h2>
      {searchResults.map((track) => (
        <Track
          key={track.id}
          track={track}
        />
      ))}
    </div>
  );
};

export default SearchResults;
