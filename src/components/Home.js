import React from 'react';
import SearchBar from './SearchBar';

function Home({ setSelectedMovie }) {
  const handleRandomPick = () => {
    const randomMovies = [
      "tt0111161", // The Shawshank Redemption
      "tt0068646", // The Godfather
      "tt0468569", // The Dark Knight
      "tt0071562", // The Godfather: Part II
      "tt0108052", // Schindler's List
      "tt0050083", // 12 Angry Men
      // Add more movie IDs here...
    ];
    const randomId = randomMovies[Math.floor(Math.random() * randomMovies.length)];
    
    fetch(`https://www.omdbapi.com/?apikey=987ac659&i=${randomId}&plot=full`)
      .then(response => response.json())
      .then(data => {
        setSelectedMovie(data);
      });
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

































