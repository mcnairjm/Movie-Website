import React, { useState } from 'react';

function MovieCard({ movie }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div onClick={handleFlip} style={{ width: '300px', height: '450px', perspective: '1000px' }}>
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    backgroundSize: 'cover'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#fff',
                    transform: 'rotateY(180deg)',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p><strong>Year:</strong> {movie.release_date}</p>
                    <p><strong>Genre:</strong> {movie.genre_ids.join(', ')}</p>
                    {/* Add other details here */}
                    <div style={{ position: 'absolute', top: '10px', right: '10px'}}>
                        <button>❤️</button> {/* Add to favorites */}
                        <button>➕</button> {/* Add to watchlist */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;