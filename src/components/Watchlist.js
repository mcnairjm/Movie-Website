import React, { useState, useEffect } from 'react';

function Watchlist({ watchlist, setSelectedMovie }) {
    const [sortedWatchlist, setSortedWatchlist] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [activeTab, setActiveTab] = useState('watchlist');
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);

    useEffect(() => {
        setSortedWatchlist(watchlist);
    }, [watchlist]);

    const handleSort = (option) => {
        setSortOption(option);
        let sorted = [...watchlist];
        
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

        setSortedWatchlist(sorted);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRandomPick = () => {
        setIsSpinning(true);
        setSelectedMovieIndex(null);
        const spinDuration = 4000; // 4 seconds of spinning
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * sortedWatchlist.length);
            setSelectedMovieIndex(randomIndex);
            setSelectedMovie(sortedWatchlist[randomIndex]);
            setIsSpinning(false);
        }, spinDuration + 2000); // Total duration includes slow down time
    };

    const handleSelectMovie = async (imdbID) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=987ac659&i=${imdbID}&plot=full`);
        const data = await response.json();
        setSelectedMovie(data);
    };

    return (
        <div>
            <div className="tab-container">
                <button 
                    className={`tab ${activeTab === 'watchlist' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('watchlist')}
                >
                    Watchlist
                </button>
                <button 
                    className={`tab ${activeTab === 'random' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('random')}
                >
                    Random Pick!
                </button>
            </div>
            {activeTab === 'watchlist' && (
                <div>
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
                        {sortedWatchlist.map(movie => (
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
                </div>
            )}
            {activeTab === 'random' && (
                <div className="random-container">
                    <div className={`film-roll ${isSpinning ? 'spin' : ''}`}>
                        <div className="film-roll-content">
                            {sortedWatchlist.map((movie, index) => (
                                <div key={index} className={`film-frame ${index === selectedMovieIndex ? 'selected' : ''}`}>
                                    <img src={movie.Poster} alt={movie.Title} style={{ width: '100px', height: '150px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="random-button-container">
                        <button onClick={handleRandomPick} className="random-button" disabled={isSpinning}>
                            {isSpinning ? 'Spinning...' : 'Pick a Movie'}
                        </button>
                    </div>
                </div>
            )}
            <style>
                {`
                    .tab-container {
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                    }
                    .tab {
                        padding: 10px 20px;
                        margin: 0 5px;
                        background-color: #f1f1f1;
                        border: 1px solid #ccc;
                        border-bottom: none;
                        border-radius: 10px 10px 0 0;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                    .tab.active {
                        background-color: #fff;
                        font-weight: bold;
                    }
                    .tab:hover {
                        background-color: #e1e1e1;
                    }
                    .movie-card:hover {
                        transform: scale(1.1); // Scale up on hover
                    }
                    .random-container {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .film-roll {
                        display: flex;
                        overflow: hidden;
                        white-space: nowrap;
                        background-color: black;
                        padding: 10px;
                        border-radius: 10px;
                        margin: 20px auto;
                        width: 80%;
                        position: relative;
                    }
                    .film-roll-content {
                        display: flex;
                        animation: scroll 20s linear infinite;
                    }
                    .film-roll.spin .film-roll-content {
                        animation: spin 1s infinite linear;
                        animation-duration: 1s;
                        animation-timing-function: ease-in-out;
                    }
                    .film-frame {
                        display: inline-block;
                        margin: 0 10px;
                        border: 5px solid #fff;
                        padding: 5px;
                        background-color: #000;
                        border-radius: 5px;
                        transition: transform 0.3s ease, border-color 0.3s ease;
                    }
                    .film-frame.selected {
                        border-color: gold;
                        box-shadow: 0 0 20px gold;
                        animation: glow 1s ease-in-out;
                    }
                    @keyframes scroll {
                        0% {
                            transform: translateX(100%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                    @keyframes spin {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                    @keyframes glow {
                        0% {
                            border-color: gold;
                            box-shadow: 0 0 20px gold;
                        }
                        100% {
                            border-color: #fff;
                            box-shadow: none;
                        }
                    }
                    .random-button-container {
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                    }
                    .random-button {
                        padding: 10px 20px;
                        font-size: 24px;
                        font-family: 'Luckiest Guy', cursive;
                        background-color: #ff6347;
                        color: #fff;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.2s;
                    }
                    .random-button:disabled {
                        cursor: not-allowed;
                        opacity: 0.6;
                    }
                    .random-button:hover:not(:disabled) {
                        transform: scale(1.1);
                    }
                `}
            </style>
        </div>
    );
}

export default Watchlist;


























