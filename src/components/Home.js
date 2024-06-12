import React from 'react';
import SearchBar from './SearchBar';

function Home({ setSelectedMovie }) {
  const generateRandomImdbId = () => {
    const randomId = Math.floor(Math.random() * 9000000) + 1000000; // Generates a random 7-digit number
    return `tt${randomId}`;
  };

  const handleRandomPick = () => {
    const randomImdbId = generateRandomImdbId();

    fetch(`https://www.omdbapi.com/?apikey=987ac659&i=${randomImdbId}&plot=full`)
      .then(response => response.json())
      .then(movieData => {
        if (movieData && movieData.Response === "True") {
          setSelectedMovie(movieData);
        } else {
          handleRandomPick(); // Retry if no valid movie is found
        }
      })
      .catch(() => handleRandomPick()); // Retry on fetch error
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '4rem', margin: '20px 0' }}>McNair's Movies</h1>
      <SearchBar setSelectedMovie={setSelectedMovie} />
      <button 
        onClick={handleRandomPick}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '24px',
          fontFamily: 'Luckiest Guy, cursive',
          backgroundColor: '#ff6347',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        RANDOM PICK!
      </button>
    </div>
  );
}

export default Home;

































