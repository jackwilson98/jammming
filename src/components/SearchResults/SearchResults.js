import React from 'react';
import Track from '../Track/Track';
import './SearchResults.module.css';

const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {searchResults.length === 0 && <p>No results found.</p>}
      {searchResults.map(track => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          isRemoval={false} // Add button visible
        />
      ))}
    </div>
  );
};

export default SearchResults;
