import React, { useState, useEffect } from 'react';

function FavoriteMovies({ favorites, setSelectedMovie }) {
    const [sortedFavorites, setSortedFavorites] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        setSortedFavorites(favorites);
    }, [favorites]);

    const handleSort = (option) => {
        setSortOption(option);
        let sorted = [...favorites];
        
        switch (option) {
            case 'a-z':
                sorted.sort((a, b) => a.Title.localeCompare(b.Title));
                break;
            case 'z-a':
                sorted.sort((a, b) => b.Title.localeCompare(a.Title));
                break;
            case 'newest-added':
                sorted.sort((a, b) => b.addedAt - a.addedAt);
                break;
            case 'oldest-added':
                sorted.sort((a, b) => a.addedAt - b.addedAt);
                break;
            case 'oldest':
                sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
                break;
            case 'newest':
                sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
                break;
            case 'g-to-r':
                sorted.sort((a, b) => a.Rated.localeCompare(b.Rated));
                break;
            case 'r-to-g':
                sorted.sort((a, b) => b.Rated.localeCompare(a.Rated));
                break;
            default:
                break;
        }

        setSortedFavorites(sorted);
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
                <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
                    <option value="a-z">A to Z</option>
                    <option value="z-a">Z to A</option>
                    <option value="newest-added">Newest Added</option>
                    <option value="oldest-added">Oldest Added</option>
                    <option value="oldest">Oldest</option>
                    <option value="newest">Newest</option>
                    <option value="g-to-r">G to R</option>
                    <option value="r-to-g">R to G</option>
                </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
                {sortedFavorites.map(movie => (
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




