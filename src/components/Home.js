import React from 'react';
import SearchBar from './SearchBar';

function Home({ setSelectedMovie }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '4rem', margin: '20px 0' }}>McNair's Movies</h1>
      <SearchBar setSelectedMovie={setSelectedMovie} />
    </div>
  );
}

export default Home;
































