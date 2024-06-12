import React, { useState } from 'react';

function FavoriteMovies() {
    const [favorites, setFavorites] = useState([]); // Fetch from local storage or API
    const [sortOption, setSortOption] = useState('');
    const [collections, setCollections] = useState([]); // Fetch or manage collections

    const handleSort = (option) => {
        setSortOption(option);
        // Sort the favorites array based on the option
    };

    const handleAddToCollection = (movie, collection) => {
        // Add movie to a specific collection
    };

    return (
        <div>
            <h2>Favorite Movies</h2>
            <div>
                <label>Sort by:</label>
                <select onChange={(e) => handleSort(e.target.value)}>
                    <option value="a-z">A to Z</option>
                    <option value="z-a">Z to A</option>
                    {/* Add more sorting options*/}
                </select>
                <label>My Collections: </label>
                <select>
                    {collections.map((collection, index) => (
                        <option key={index} value={collection.name}>{collection.name}</option>
                    ))}
                    </select> 
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {favorites.map(movie => (
                    <div key={movie.id} style={{ margin: '10px' }}>
                        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
                        {/*Add other movie details if needed*/}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteMovies;