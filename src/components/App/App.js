import React, { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

const App = () => {
  // Mock search results
  const [searchResults, setSearchResults] = useState([
    {
      id: "1",
      name: "Song A",
      artist: "Artist A",
      album: "Album A",
    },
    {
      id: "2",
      name: "Song B",
      artist: "Artist B",
      album: "Album B",
    },
    {
      id: "3",
      name: "Song C",
      artist: "Artist C",
      album: "Album C",
    },
  ]);

  return (
    <div>
      <h1>Jammming</h1>
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default App;
