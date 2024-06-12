import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faStar, faList, faCalendar } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ isOpen, onToggle }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 1000 }}>
      <div onClick={onToggle} style={{
        position: 'absolute',
        top: 10,
        left: isOpen ? 180 : 10,
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1001,
        transition: 'left 0.3s'
      }}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div style={{
        width: isOpen ? '200px' : '60px',
        height: '100%',
        backgroundColor: '#333',
        color: '#fff',
        transition: 'width 0.3s',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '50px',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
            <FontAwesomeIcon icon={faHome} style={{ marginRight: isOpen ? '10px' : '0', flexShrink: 0 }} />
            {isOpen && <span>Home</span>}
          </div>
        </Link>
        <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
            <FontAwesomeIcon icon={faStar} style={{ marginRight: isOpen ? '10px' : '0', flexShrink: 0 }} />
            {isOpen && <span>Favorites</span>}
          </div>
        </Link>
        <Link to="/watchlist" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
            <FontAwesomeIcon icon={faList} style={{ marginRight: isOpen ? '10px' : '0', flexShrink: 0 }} />
            {isOpen && <span>Watchlist</span>}
          </div>
        </Link>
        <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
            <FontAwesomeIcon icon={faCalendar} style={{ marginRight: isOpen ? '10px' : '0', flexShrink: 0 }} />
            {isOpen && <span>Release Calendar</span>}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;




