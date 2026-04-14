import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../store/Camper/operations.js";
import Navigation from "../../components/Navigation/Navigation";
import styles from "./CatalogPage.module.css";
import { Icon } from "../../icon.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, total, loading, error } = useSelector(
    (state) => state.campers,
  );

  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [vehicleType, setVehicleType] = useState("");

  const limit = 4;

  const getActiveFilters = useCallback(() => {
    const filters = {};
    if (location) filters.location = location;
    if (vehicleType) filters.vehicleType = vehicleType;
    if (equipment.length) filters.equipment = equipment;
    return filters;
  }, [location, vehicleType, equipment]);

  useEffect(() => {
    const filters = getActiveFilters();
    dispatch(fetchCampers({ page, limit, filters }));
  }, [dispatch, page, getActiveFilters]);

  const handleSearch = () => {
    setPage(1);
    const filters = getActiveFilters();
    dispatch(fetchCampers({ page: 1, limit, filters }));
  };

  const toggleEquipment = (value) => {
    setEquipment((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };
  const iconMap = {
    AC: <Icon id="icon-wind" className={styles["filter-icon"]}/>,
    Automatic: <Icon id="icon-diagram" className={styles["filter-icon"]}/>,
    Kitchen: <Icon id="icon-cup-hot" className={styles["filter-icon"]}/>,
    TV: <Icon id="icon-tv" className={styles["filter-icon"]}/>,
    Bathroom: <Icon id="icon-ph-shower" className={styles["filter-icon"]}/>,
    Van: <Icon id="icon-bi_grid-1" className={styles["filter-icon"]}/>,
    "Fully Integrated": <Icon id="icon-bi_grid" className={styles["filter-icon"]}/>,
    Alcove: <Icon id="icon-bi_grid-3" className={styles["filter-icon"]}/>
  };
  const hasMore = items.length < total;

  return (
    <div className={styles["catalog-page"]}>
      <Navigation />

      <main className={styles["catalog-container"]}>
        <aside className={styles.sidebar}>
          <div className={styles["filter-group"]}>
            <label className={styles["filter-label-top"]}>Location</label>
            <div className={styles["location-wrapper"]}>
              <Icon id="icon-Map" className={styles["location-icon"]} />
              <input
                type="text"
                placeholder="Kyiv, Ukraine"
                className={styles["location-input"]}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.filters}>
            <p className={styles["filter-label"]}>Filters</p>

            <h3 className={styles["filter-title"]}>Vehicle equipment</h3>
            <hr className={styles.divider} />
            <div className={styles["filter-grid"]}>
              {["AC", "Automatic", "Kitchen", "TV", "Bathroom"].map((item) => (
                <button
                  key={item}
                  className={`${styles["filter-card"]} ${
                    equipment.includes(item) ? styles.active : ""
                  }`}
                  onClick={() => toggleEquipment(item)}
                >
                  <span className={styles["filter-icon"]}>
                    {iconMap[item]}
                  </span>
                  {item}
                </button>
              ))}
            </div>

            <h3 className={styles["filter-title"]}>Vehicle type</h3>
            <hr className={styles.divider} />
            <div className={styles["filter-grid"]}>
              {["Van", "Fully Integrated", "Alcove"].map((type) => (
                <button
                  key={type}
                  className={`${styles["filter-card"]} ${
                    vehicleType === type ? styles.active : ""
                  }`}
                  onClick={() =>
                    setVehicleType(vehicleType === type ? "" : type)
                  }
                >
                  <span className={styles["filter-icon"]}>
                    {iconMap[type]}
                  </span>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button className={styles["searchBtn"]} onClick={handleSearch}>
            Search
          </button>
        </aside>

        <section className={styles["camper-list-section"]}>
          <div className={styles["camper-list"]}>
            {items.map((camper) => (
              <div key={camper.id} className={styles["camper-card"]}>
                <div
                  className={styles["camper-image"]}
                  style={{
                    backgroundImage: `url(${camper.gallery[0]?.original})`,
                  }}
                ></div>

                <div className={styles["camper-details"]}>
                  <div className={styles["card-header"]}>
                    <h2>{camper.name}</h2>
                    <p className={styles.price}>€{camper.price}.00
                      <Icon id="icon-heart" className={styles["location-icon"]} />
                    </p>
                  </div>
                  <div className={styles["card-info"]}>
                    <span>
                      ★ {camper.rating} ({camper.reviews?.length || 0} Reviews)
                    </span>
                    <span>{camper.location}</span>
                  </div>
                  <p className={styles.description}>
                    {camper.description.length > 100
                      ? `${camper.description.slice(0, 100)}...`
                      : camper.description}
                  </p>
                  <div className={styles.tags}>
                    {camper.transmission?.toLowerCase() === "automatic" && (
                      <span className={styles.tag}>Automatic</span>
                    )}
                    {camper.AC && <span className={styles.tag}>AC</span>}
                    {camper.kitchen && (
                      <span className={styles.tag}>Kitchen</span>
                    )}
                    {camper.TV && <span className={styles.tag}>TV</span>}
                    {camper.bathroom && (
                      <span className={styles.tag}>Bathroom</span>
                    )}
                  </div>
                  <Link
                    to={`/catalog/${camper.id}`}
                    className={styles["show-more"]}
                  >
                    Show more
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {error && <p className={styles.error}>Error: {error}</p>}

          {hasMore && !loading && (
            <button
              className={styles["load-more-btn"]}
              onClick={() => setPage((p) => p + 1)}
            >
              Load more
            </button>
          )}
          {loading && <p className={styles.loading}>Loading...</p>}
        </section>
      </main>
    </div>
  );
};

export default CatalogPage;
