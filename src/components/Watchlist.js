import React, { useState, useEffect } from 'react';

function Watchlist({ watchlist, setSelectedMovie }) {
    const [activeTab, setActiveTab] = useState('watchlist');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRandomPick = () => {
        // Implement random pick functionality
        const randomMovie = watchlist[Math.floor(Math.random() * watchlist.length)];
        setSelectedMovie(randomMovie);
    };

    const handleSelectMovie = async (imdbID) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=987ac659&i=${imdbID}&plot=full`);
        const data = await response.json();
        setSelectedMovie(data);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleTabChange('watchlist')}>Watchlist</button>
                <button onClick={() => handleTabChange('random')}>Random Pick!</button>
            </div>
            {activeTab === 'watchlist' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
                    {watchlist.map(movie => (
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
            {activeTab === 'random' && (
                <div>
                    <div style={{ display: 'flex', overflowX: 'scroll' }}>
                        {watchlist.map(movie => (
                            <div key={movie.imdbID} style={{ margin: '10px' }}>
                                <img src={movie.Poster} alt={movie.Title} style={{ width: '100px', height: '150px' }} />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleRandomPick}>Pick a Movie</button>
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

export default Watchlist;

