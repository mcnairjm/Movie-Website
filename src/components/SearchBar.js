import React, { useState } from 'react';

function SearchBar({ setSelectedMovie }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState ([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 2) {
            // Replace with actual API call
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${e.target.value}`);
            const data = await response.json();
            setResults(data.results);
        }   else {
            setResults([]);
        }
    };

    const handleSelectMoive = (movie) => {
        setSelectedMovie(movie);
        setQuery('');
        setResults([]);
    };

    return (
        <div>
            <input 
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder='Search for a movie...'
                style={{ widith: '100%', padding: '10px', fontSize: '18px' }}
            />
            {results.length > 0 && (
                <ul style={{ listStyle: 'none', padingg: 0 }}>
                    {results.map(movie => {
                        <li key={movie.id} onClick={() => handleSelectMoive(movie)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                        {movie.title}
                        </li>
                    })}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
