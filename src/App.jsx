import './App.css'
import Header from './Header';
import Gallery from './Gallery';
import { useState } from 'react';

// https://api.unsplash.com/search/photos?query=minimal&client_id=OHNNeJpQUczQ-Qb2M_Tnoxr_gy2Qi6w3XvF-oXYzFak&per_page=20

function App() {

  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('minimal');

  return (
    <>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchSubmit={() => setSearchTerm(searchValue)}
      />
      <Gallery searchTerm={searchTerm} />
    </>
  );
}

export default App