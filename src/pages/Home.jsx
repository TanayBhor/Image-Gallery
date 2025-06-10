import { useEffect, useState } from 'react';
import '../styles/gallery.css'
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import PhotoViewer from '../components/PhotoViewer';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const client_id = import.meta.env.VITE_API_KEY;

  console.log('photos', photos);
  console.log('loading', loading);
  console.log('loadedImages', loadedImages);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {

      try {

        const response = await fetch(`https://api.unsplash.com/photos?per_page=30&client_id=${client_id}`);
        const data = await response.json();
        setPhotos(data);
        setLoadedImages({});
        setLoading(false);

      } catch (error) {
        console.error('Error fetching photos:', error)
      }

    };
    fetchImages();
  }, []);

  // Watch for when all images are loaded
  useEffect(() => {
    if (photos.length > 0 && Object.keys(loadedImages).length === photos.length) {
      setLoading(false);
    }
  }, [loadedImages, photos]);

  if (loading) return <Loader />
  // if (loading) return <div></div>

  return (
    <div className="gallery-container">
      <div className="gallery-images">
        {photos.map((pic) => (
          <div key={pic.id} className="image-wrapper" onClick={() => navigate(`/photo/${pic.id}`)}>
            <img
              src={pic.urls.regular}
              alt={pic.alt_description || 'Unsplash Image'}
              className={`gallery-image ${loadedImages[pic.id] ? 'loaded' : ''}`}
              onLoad={() =>
                setLoadedImages((prev) => ({
                  ...prev,
                  [pic.id]: true,
                }))
              }
            />
            <div className="overlay">
              <div className="user-details">
                <img
                  className="user-image"
                  src={pic.user.profile_image.small}
                  alt={pic.user.name}
                  
                />
                <p className="user-name">{pic.user.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
