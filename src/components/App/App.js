import React, { useState } from "react";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

const App = () => {
  const [searchResults, setSearchResults] = useState([
    { id: "1", name: "Song A", artist: "Artist A", album: "Album A", uri: "uri1" },
    { id: "2", name: "Song B", artist: "Artist B", album: "Album B", uri: "uri2" },
    { id: "3", name: "Song C", artist: "Artist C", album: "Album C", uri: "uri3" },
  ]);

  const [playlistTracks, setPlaylistTracks] = useState([
    { id: "1", name: "Song A", artist: "Artist A", album: "Album A", uri: "uri1" },
  ]);

  // Add track to playlist if not already added
  const addTrack = (track) => {
    setPlaylistTracks((prevTracks) => {
      if (prevTracks.some((savedTrack) => savedTrack.id === track.id)) {
        return prevTracks; // already in playlist, do nothing
      }
      return [...prevTracks, track];
    });
  };

  // Remove track from playlist
  const removeTrack = (trackToRemove) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter(track => track.id !== trackToRemove.id)
    );
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <Playlist playlistTracks={playlistTracks} onRemove={removeTrack} />
    </div>
  );
};

export default App;
