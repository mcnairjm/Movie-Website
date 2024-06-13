import React, { useState } from 'react';

function FavoriteMovies({ favorites, setSelectedMovie }) {
    const [sortOption, setSortOption] = useState('');
    const [collections, setCollections] = useState([]); // Fetch or manage collections

    const handleSort = (option) => {
        setSortOption(option);
        // Sort the favorites array based on the option
    };

    const handleSelectMovie = async (imdbID) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=987ac659&i=${imdbID}&plot=full`);
        const data = await response.json();
        setSelectedMovie(data);
    };

    return (
        <div>
            <h2>Favorite Movies</h2>
            <div>
                <label>Sort by:</label>
                <select onChange={(e) => handleSort(e.target.value)}>
                    <option value="a-z">A to Z</option>
                    <option value="z-a">Z to A</option>
                    {/* Add more sorting options */}
                </select>
                <label>My Collections: </label>
                <select>
                    {collections.map((collection, index) => (
                        <option key={index} value={collection.name}>{collection.name}</option>
                    ))}
                </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
                {favorites.map(movie => (
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

export default FavoriteMovies;



