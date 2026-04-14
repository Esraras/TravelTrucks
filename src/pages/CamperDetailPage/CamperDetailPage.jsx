import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import styles from './CamperDetailPage.module.css';
import { fetchCamperById } from '../../store/Camper/operations.js';

const CamperDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { camper, loading, error } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCamperById(id));
    }, [id, dispatch]);

    if (loading) {
        return (
            <>
                <Navigation />
                <div className={styles['detail-container']}>
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    if (error || !camper) {
        return (
            <>
                <Navigation />
                <div className={styles['detail-container']}>
                    <p>{error || 'Camper not found'}</p>
                    <Link to="/catalog" className={styles['back-button']}>Back to Catalog</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navigation />
            <div className={styles['detail-container']}>
                
                <div className={styles['detail-content']}>
                    <div className={styles['detail-header']}>
                        <h1>{camper.name}</h1>
                        <div className={styles['header-info']}>
                            <span className={styles.rating}>★ {camper.rating} ({camper.reviews} Reviews)</span>
                            <span className={styles.location}>{camper.location}</span>
                        </div>
                        <p className={styles.price}>€{camper.price}.00</p>
                    </div>

                    <div className={styles['gallery']}>
                        {camper.gallery && camper.gallery.length > 0 && (
                            <img 
                                src={camper.gallery[0].original} 
                                alt={camper.name}
                                className={styles['main-image']}
                            />
                        )}
                        {camper.gallery && camper.gallery.length > 1 && (
                            <div className={styles['gallery-thumbnails']}>
                                {camper.gallery.map((img, idx) => (
                                    <img 
                                        key={idx}
                                        src={img.original} 
                                        alt={`${camper.name} ${idx + 1}`}
                                        className={styles['thumbnail']}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles['description']}>
                        <p>{camper.description}</p>
                    </div>

                    <div className={styles['equipment-section']}>
                        <h2>Equipment</h2>
                        <div className={styles['equipment-grid']}>
                            {camper.equipment && camper.equipment.map((item, idx) => (
                                <div key={idx} className={styles['equipment-item']}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles['details-section']}>
                        <h2>Details</h2>
                        <div className={styles['details-grid']}>
                            {camper.details && Object.entries(camper.details).map(([key, value]) => (
                                <div key={key} className={styles['detail-item']}>
                                    <span className={styles['detail-label']}>{key}:</span>
                                    <span className={styles['detail-value']}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={styles['book-button']}>Book Now</button>
                </div>
            </div>
        </>
    );
};

export default CamperDetailPage;
