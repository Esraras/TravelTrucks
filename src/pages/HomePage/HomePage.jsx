import React from "react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };

  return (
    <>
      <div className={styles['hero-container']}>
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>Campers of your dreams</h1>
          <p className={styles['hero-subtitle']}>
            You can find everything you want in our catalog
          </p>
          <button className={styles['hero-button']} onClick={handleClick}>
            View Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;