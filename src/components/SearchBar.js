import React, { useState } from 'react';

function SearchBar({ setSelectedMovie }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchMovieData = async (searchQuery) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=987ac659&s=${searchQuery}`);
    const data = await response.json();
    if (data.Search) {
      return data.Search;
    }
    return [];
  };

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const movies = await fetchMovieData(e.target.value);
      setResults(movies);
    } else {
      setResults([]);
    }
  };

  const handleSelectMovie = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=987ac659&i=${imdbID}&plot=full`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a movie..."
        style={{
          width: '40%',
          padding: '10px',
          fontSize: '18px',
          margin: '20px 0',
          borderRadius: '20px',
          boxSizing: 'border-box',
        }}
      />
      {results.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
          {results.map(movie => (
            <div key={movie.imdbID} onClick={() => handleSelectMovie(movie.imdbID)} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              margin: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '150px',
              textAlign: 'center',
              transition: 'transform 0.3s ease', // Add transition for smooth scaling
            }} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} style={{ width: '100px', height: '150px' }} />
              <p style={{ fontSize: '14px', margin: '10px 0 0 0' }}>{movie.Title}</p>
              <p style={{ fontSize: '12px', color: '#555' }}>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
      <style>
        {`
          .movie-card:hover {
            transform: scale(1.1); // Scale up on hover
          }
        `}
      </style>
    </div>
  );
}

export default SearchBar;
















