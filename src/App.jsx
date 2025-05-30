import './styles/App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Search from './pages/Search';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/search/:query" element={<Search />} /> */}
      </Routes>

    </>
  );
}

export default App