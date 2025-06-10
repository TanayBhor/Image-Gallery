import './styles/App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import { Route, Routes } from 'react-router-dom';
import PhotoViewer from './components/PhotoViewer';

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/photo/:id" element={<PhotoViewer />} />
      </Routes>

    </>
  );
}

export default App