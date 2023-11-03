// SearchBar.js
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const results = await onSearch(query);
        console.log("Search Results:", results);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        // Handle the error appropriately here, e.g., show an error message to the user
      }
    }
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for tracks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <br></br>
        <p>You can search by Artist, Album, or The name of the song.</p>
      </form>
    </div>
  );
}

export default SearchBar;
