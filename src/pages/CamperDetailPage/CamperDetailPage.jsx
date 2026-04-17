import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import styles from './CamperDetailPage.module.css';
import { fetchCamperById } from '../../store/Camper/operations.js';
import { ThreeDots } from 'react-loader-spinner';

const CamperDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCamper, loading, error } = useSelector((state) => state.campers);
  const [activeTab, setActiveTab] = useState('features');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Booking data', formValues);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className={styles['detail-container']}>
           <ThreeDots
                height="40"
                width="40"
                color="#3147cc"
                visible={true}
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
        </div>
      </>
    );
  }

  if (error || !currentCamper) {
    return (
      <>
        <Navigation />
        <div className={styles['detail-container']}>
          <p>{error || 'Camper not found'}</p>
          <Link to="/catalog" className={styles['back-button']}>
            Back to Catalog
          </Link>
        </div>
      </>
    );
  }

  const camper = currentCamper;
  const reviewsCount = Array.isArray(camper.reviews) ? camper.reviews.length : camper.reviews || 0;
  const featureTags = [];

  if (camper.transmission?.toLowerCase() === 'automatic') featureTags.push('Automatic');
  if (camper.AC) featureTags.push('AC');
  if (camper.fuel?.toLowerCase() === 'petrol') featureTags.push('Petrol');
  if (camper.kitchen) featureTags.push('Kitchen');
  if (camper.TV) featureTags.push('TV');
  if (camper.bathroom) featureTags.push('Bathroom');
  if (camper.radio) featureTags.push('Radio');

  const detailEntries = camper.details ? Object.entries(camper.details) : [];

  return (
    <>
      <Navigation />
      <div className={styles['detail-container']}>
        <div className={styles['detail-content']}>
          <div className={styles['detail-header']}>
            <div>
              <div className={styles['title-row']}>
                <h1>{camper.name}</h1>
                <p className={styles.price}>€{camper.price}.00</p>
              </div>
              <div className={styles['header-info']}>
                <span className={styles.rating}>★ {camper.rating} ({reviewsCount} Reviews)</span>
                <span className={styles.location}>{camper.location}</span>
              </div>
            </div>
          </div>

          <div className={styles['gallery-grid']}>
            {Array.isArray(camper.gallery) && camper.gallery.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img.original}
                alt={`${camper.name} ${idx + 1}`}
                className={styles['gallery-image']}
              />
            ))}
          </div>

          <p className={styles.description}>{camper.description}</p>

          <div className={styles['detail-layout']}>
            <section className={styles['detail-main']}>
              <div className={styles.tabs}>
                <button
                  type="button"
                  className={`${styles['tab-button']} ${activeTab === 'features' ? styles.active : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button
                  type="button"
                  className={`${styles['tab-button']} ${activeTab === 'reviews' ? styles.active : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              {activeTab === 'features' ? (
                <>
                  <div className={styles['feature-chips']}>
                    {featureTags.length > 0 ? (
                      featureTags.map((tag) => (
                        <span key={tag} className={styles['feature-chip']}>
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className={styles['feature-chip']}>No feature data</span>
                    )}
                  </div>

                  <div className={styles['panel-box']}>
                    <h2>Vehicle details</h2>
                    <dl className={styles['details-list']}>
                      {detailEntries.length > 0 ? (
                        detailEntries.map(([key, value]) => (
                          <div key={key} className={styles['detail-row']}>
                            <dt>{key}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))
                      ) : (
                        <p className={styles['empty-message']}>Details are not available.</p>
                      )}
                    </dl>
                  </div>
                </>
              ) : (
                <div className={styles['reviews-section']}>
                  {Array.isArray(camper.reviews) && camper.reviews.length > 0 ? (
                    camper.reviews.map((review, index) => (
                      <article key={index} className={styles['review-item']}>
                        <div className={styles['review-meta']}>
                          <span>{review.user || 'Guest'}</span>
                          <span>{review.rating || camper.rating} ★</span>
                        </div>
                        <p className={styles['review-text']}>{review.comment || review}</p>
                      </article>
                    ))
                  ) : (
                    <p className={styles['empty-message']}>No reviews yet.</p>
                  )}
                </div>
              )}
            </section>

            <aside className={styles['booking-panel']}>
              <div className={styles['booking-header']}>
                <h2>Book your campervan now</h2>
                <p>Stay connected! We are always ready to help you.</p>
              </div>
              <form className={styles['booking-form']} onSubmit={handleSubmit}>
                <label className={styles['form-field']}>
                  Name*
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </label>
                <label className={styles['form-field']}>
                  Email*
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                  />
                </label>
                <label className={styles['form-field']}>
                  Booking date*
                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleInputChange}
                  />
                </label>
                <label className={styles['form-field']}>
                  Comment
                  <textarea
                    name="comment"
                    value={formValues.comment}
                    onChange={handleInputChange}
                    placeholder="Your message"
                  />
                </label>
                <button className={styles['submit-button']} type="submit">
                  Send
                </button>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default CamperDetailPage;
