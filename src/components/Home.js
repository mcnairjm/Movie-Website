import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div>
      <SearchBar setSelectedMovie={setSelectedMovie} />
      {selectedMovie && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <MovieCard movie={selectedMovie} />
        </div>
      )}
    </div>
  );
}

export default Home;

