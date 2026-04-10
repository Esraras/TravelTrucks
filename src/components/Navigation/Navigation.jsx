import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles['nav-container']}>
        <Link to="/" className={styles.logo}>Travel<span>Trucks</span></Link>
        <ul className={styles['nav-links']}>
          <li><Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link></li>
          <li><Link to="/catalog" className={location.pathname === '/catalog' ? styles.active : ''}>Catalog</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;