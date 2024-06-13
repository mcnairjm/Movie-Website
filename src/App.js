import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FavoriteMovies from './components/FavoriteMovies';
import Watchlist from './components/Watchlist';
import ReleaseCalendar from './components/ReleaseCalendar';
import Sidebar from './components/Sidebar';
import MovieCard from './components/MovieCard';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]); // Add this line to manage favorites
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setSelectedMovie(null);
        setOverlayVisible(false);
      }
    };

    if (overlayVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [overlayVisible]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addToFavorites = (movie) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.imdbID === movie.imdbID)) {
        return prevFavorites.filter(fav => fav.imdbID !== movie.imdbID); // Remove if already in favorites
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
        <div style={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? '200px' : '60px',
          transition: 'margin-left 0.3s',
          padding: '20px',
          position: 'relative',
          zIndex: overlayVisible ? 2 : 0,
          filter: overlayVisible ? 'blur(10px)' : 'none'
        }}>
          <Routes>
            <Route path="/" element={<Home setSelectedMovie={(movie) => {
              setSelectedMovie(movie);
              setOverlayVisible(true);
            }} addToFavorites={addToFavorites} favorites={favorites} />} />
            <Route path="/favorites" element={<FavoriteMovies favorites={favorites} setSelectedMovie={(movie) => {
              setSelectedMovie(movie);
              setOverlayVisible(true);
            }} />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/calendar" element={<ReleaseCalendar />} />
          </Routes>
        </div>
      </div>
      {overlayVisible && (
        <div
          onClick={() => {
            setSelectedMovie(null);
            setOverlayVisible(false);
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(10px)',
            zIndex: 1
          }}
        />
      )}
      {selectedMovie && (
        <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
          <div ref={cardRef}>
            <MovieCard movie={selectedMovie} addToFavorites={addToFavorites} favorites={favorites} />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;






