import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faPlus as solidPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlineHeart, faSquare as outlineSquare } from '@fortawesome/free-regular-svg-icons';

function MovieCard({ movie, addToFavorites, favorites, addToWatchlist, watchlist }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPlot, setShowPlot] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowPlot(false); // Hide plot when flipping the card
  };

  const togglePlot = (e) => {
    e.stopPropagation(); // Prevent flipping the card when clicking the button
    setShowPlot(!showPlot);
  };

  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
  const isInWatchlist = watchlist.some(watch => watch.imdbID === movie.imdbID);

  return (
    <div onClick={handleFlip} style={{ width: '400px', height: '600px', perspective: '1000px', cursor: 'pointer' }}>
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
          backgroundImage: `url(${movie.Poster})`,
          backgroundSize: 'cover'
        }} />
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundColor: 'white', // White background to ensure no see-through
          transform: 'rotateY(180deg)',
          padding: '20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${movie.Poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3, // Make the poster less opaque for readability
            zIndex: -1
          }} />
          <div style={{ position: 'absolute', top: '10px', right: '10px', left: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <FontAwesomeIcon
              icon={isFavorite ? solidHeart : outlineHeart}
              onClick={(e) => {
                e.stopPropagation();
                addToFavorites(movie);
              }}
              style={{ fontSize: '36px', cursor: 'pointer', color: isFavorite ? 'red' : 'black' }}
            />
            <FontAwesomeIcon
              icon={isInWatchlist ? solidPlus : outlineSquare}
              onClick={(e) => {
                e.stopPropagation();
                addToWatchlist(movie);
              }}
              style={{ fontSize: '36px', cursor: 'pointer', color: isInWatchlist ? 'green' : 'black' }}
            />
          </div>
          <div style={{ paddingTop: '70px', flexGrow: 1, overflowY: 'auto', marginTop: '50px' }}>
            <h2 style={{ fontSize: '28px', margin: '0' }}>{movie.Title} <span style={{ fontSize: '22px', fontWeight: 'normal' }}>({movie.Year})</span></h2>
            <div style={{ marginTop: '5px' }}>
              <p style={{ fontSize: '14px', border: '1px solid black', display: 'inline-block', padding: '2px 4px', marginRight: '10px' }}>{movie.Rated}</p>
              <p style={{ fontSize: '14px', border: '1px solid black', display: 'inline-block', padding: '2px 4px' }}>{movie.Runtime}</p>
            </div>
            <button onClick={togglePlot} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
              {showPlot ? 'Hide Plot' : 'Show Plot'}
            </button>
            {showPlot && (
              <div style={{ marginTop: '10px', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '10px' }}>
                <p style={{ color: 'white' }}>{movie.Plot}</p>
              </div>
            )}
            <p><strong>Genre:</strong> {movie.Genre ? movie.Genre : 'N/A'}</p>
            <p><strong>Director:</strong> {movie.Director ? movie.Director : 'N/A'}</p>
            <p><strong>Actors:</strong> {movie.Actors ? movie.Actors : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;








































