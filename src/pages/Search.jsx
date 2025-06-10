import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../styles/gallery.css'
import Loader from '../components/Loader';

const Search = () => {

  const { query } = useParams();
  const [searchParams] = useSearchParams();
  // const orientation = searchParams.get("orientation") || "";

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  const navigate = useNavigate();

  console.log(query, photos)

  const client_id = import.meta.env.VITE_API_KEY;

  const fetchImages = () => {

    setLoading(true)

    let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&per_page=30`;

    // if (orientation) {
    //   url += `&orientation=${orientation}`;
    // }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPhotos(data.results);
        setLoadedImages({});
        setLoading(false);
      })
      .catch(error => console.error("Error fetching photos:", error))

  }

  useEffect(() => {
    fetchImages()
  }, [query])

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
                onLoad={() => setLoadedImages(prev => ({ ...prev, [pic.id]: true }))}
              />

              <div className="overlay">
                <div className='user-details'>
                  <img className='user-image' src={pic.user.profile_image.small} alt="" />
                  <p className="user-name">{pic.user.name}</p>
                </div>
              </div>

            </div>
          ))}

        </div>
    </div>
  )
}

export default Search