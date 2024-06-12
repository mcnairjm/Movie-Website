import React, { useState } from 'react';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]); // Fetch from local storage or API
    const [activeTab, setActiveTab] = useState('watchlist');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRandomPick = () => {
        // Implement rnadom pick functionality
    };

    return (
        <div>
            <div>
                <button onClick={() => handleTabChange('watchlist')}>Watchlist</button>
                <button onClick={() => handleTabChange('random')}>Random Pick!</button>
            </div>
            {activeTab === 'watchlist' && (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {watchlist.map(movie => (
                        <div key={movie.id} style={{ margin: '10px' }}>
                            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
                            {/*Add other movie details if needed*/}
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'random' && (
                <div>
                    <div style={{ display: 'flex', overflowX: 'scroll' }}>
                        {watchlist.map(movie => (
                            <div key={movie.id} style={{ margin: '10px' }}>
                                <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleRandomPick}>Pick a Movie</button>
                </div>
            )}
        </div>
    );
}

export default Watchlist;
