import { useEffect, useState } from 'react'

const Gallery = ({searchTerm }) => {

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const client_id = import.meta.env.VITE_API_KEY;
  const searchQuery = searchTerm
  console.log(searchTerm)

  useEffect(() => {

    // fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${client_id}&per_page=30`)
    //   .then(res => res.json())
    //   .then(data => setPhotos(data.results))
    //   .catch(error => console.error("Error fetching photos:", error))


    fetch(`https://api.unsplash.com/photos?per_page=10&client_id=${client_id}`)
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(error => console.error("Error fetching photos:", error))

      setLoading(false)
      
  }, [searchTerm])

  if(loading){
    return(
      <div className='loading'>Loading</div>
    )
  }

  return (
      <div className="gallery-container">

        <div className="gallery-images">

          {photos.map((pic) => (
            <div key={pic.id} className="image-wrapper">

              <img
                src={pic.urls.regular}
                alt={pic.alt_description || 'Unsplash Image'}
                className="gallery-image"
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

export default Gallery