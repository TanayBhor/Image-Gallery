import { useEffect, useState } from 'react'

const Content = () => {

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const client_id = import.meta.env.VITE_API_KEY;
  const searchQuery = "minimalism"

  useEffect(() => {

    fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${client_id}&per_page=10`)
      .then(res => res.json())
      .then(data => setPhotos(data.results))
      .catch(error => console.error("Error fetching photos:", error))
      
  }, [])

  return (
      <div className="gallery-container">

        <div className="gallery-images">

          {photos.map((pic)=>(

            <img key={pic.id} src={pic.urls.regular}/>

          ))}

        </div>

      </div>
  )
}

export default Content