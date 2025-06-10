import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/PhotoViewer.css';
import Loader from './Loader';

const PhotoViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true)
  const imageRef = useRef();
  const bgRef = useRef();
  const containerRef = useRef();
  const tl = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);


  const client_id = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchImage() {
      try {

        const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${client_id}`);
        const data = await response.json();
        setPhoto(data);
        setLoading(false);

      } catch (error) {
        console.error('Failed to load photo', err)
      }
    }
    fetchImage()
  }, [id]);

  useEffect(() => {
    if (photo && imageLoaded) {
      // Animation timeline
      tl.current = gsap.timeline();

      tl.current
        .fromTo(bgRef.current,
          { y: '-100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' }
        )
        .fromTo(
          imageRef.current,
          { y: '100%' }, // start below the wrapper
          { y: '0%', duration: 2, ease: 'power4.out' },
          '<0.2'
        )

    }
  }, [photo,imageLoaded]);

  const handleBack = () => {
    if (tl.current) {
      tl.current.timeScale(1.5);
      tl.current.reverse().eventCallback("onReverseComplete", () => {
        navigate(-1);
      });
    } else {
      navigate(-1);
    }
  };

  // if (loading) return <Loader />;
  if (loading) return <div></div>

  return (
    <div className="photo-fullscreen" ref={containerRef}>
      {/* Background blurred */}
      <div
        className="blurred-background"
        ref={bgRef}
        style={{ backgroundImage: `url(${photo.urls.regular})` }}
      />

      <button className="back-button" onClick={handleBack}>← Back</button>

      {/* Main image */}
      <div className="image-wrapper-gsap">
        <img
          src={photo.urls.full}
          alt={photo.alt_description}
          className="fullscreen-image"
          ref={imageRef}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default PhotoViewer;
