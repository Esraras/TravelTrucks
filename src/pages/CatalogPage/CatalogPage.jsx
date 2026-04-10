import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../store/campersSlice";
import Navigation from "../../components/Navigation/Navigation";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  
  const { items, total, loading, error } = useSelector(state => state.campers);
  
  const [page, setPage] = useState(1);
  const limit = 4; 

  useEffect(() => {
    dispatch(fetchCampers({ page, limit }));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const hasMore = items.length < total;

  return (
    <div className={styles["catalog-page"]}>
      <Navigation />

      <main className={styles["catalog-container"]}>
        <aside className={styles.sidebar}>
          <div className={styles["filter-group"]}>
            <label className={styles["filter-label-top"]}>Location</label>
            <div className={styles["location-input-wrapper"]}>
              <input type="text" placeholder="Kyiv, Ukraine" className={styles["location-input"]} />
            </div>
          </div>

          <div className={styles.filters}>
            <p className={styles["filter-label"]}>Filters</p>
            
            <h3 className={styles["filter-title"]}>Vehicle equipment</h3>
            <hr className={styles.divider} />
            <div className={styles["filter-grid"]}>
              <button className={`${styles["filter-card"]} ${styles.active}`}>AC</button>
              <button className={styles["filter-card"]}>Automatic</button>
              <button className={styles["filter-card"]}>Kitchen</button>
              <button className={styles["filter-card"]}>TV</button>
              <button className={styles["filter-card"]}>Bathroom</button>
            </div>

            <h3 className={styles["filter-title"]}>Vehicle type</h3>
            <hr className={styles.divider} />
            <div className={styles["filter-grid"]}>
              <button className={styles["filter-card"]}>Van</button>
              <button className={styles["filter-card"]}>Fully Integrated</button>
              <button className={styles["filter-card"]}>Alcove</button>
            </div>
          </div>
          
          <button className={styles["search-button"]}>Search</button>
        </aside>

        <section className={styles["camper-list-section"]}>
          <div className={styles["camper-list"]}>
            {items.map((camper) => (
              <div key={camper.id} className={styles["camper-card"]}>
                <div 
                  className={styles["camper-image"]} 
                  style={{ backgroundImage: `url(${camper.gallery[0]?.original})` }}
                ></div>
                
                <div className={styles["camper-details"]}>
                  <div className={styles["card-header"]}>
                    <h2>{camper.name}</h2>
                    <div className={styles["price-wrapper"]}>
                      <p className={styles.price}>€{camper.price}.00</p>
                      {/* Kalp ikonu buraya eklenebilir */}
                    </div>
                  </div>
                  
                  <div className={styles["card-info"]}>
                    <span className={styles.rating}>★ {camper.rating} ({camper.reviews?.length || 0} Reviews)</span>
                    <span className={styles.location}>{camper.location}</span>
                  </div>
                  
                  <p className={styles.description}>{camper.description}</p>
                  
                  <div className={styles.tags}>
                    {camper.transmission && <span className={styles.tag}>{camper.transmission}</span>}
                    {camper.engine && <span className={styles.tag}>{camper.engine}</span>}
                    {camper.AC && <span className={styles.tag}>AC</span>}
                    {camper.kitchen && <span className={styles.tag}>Kitchen</span>}
                  </div>
                  
                  <Link to={`/catalog/${camper.id}`} className={styles["show-more"]}>
                    Show more
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {error && <p className={styles.error}>Error: {error}</p>}
          {!loading && items.length === 0 && <p>No campers found.</p>}

          {hasMore && (
            <button 
              className={styles["load-more-btn"]} 
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default CatalogPage;