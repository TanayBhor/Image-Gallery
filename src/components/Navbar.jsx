import { useState } from 'react';
import '../styles/navbar.css'
import { IoIosSearch } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {

  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamsFromHook] = useSearchParams();


  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const query = searchValue.trim();
    if (!query) return;

    const orientation = searchParams.get('orientation');

    if (orientation) {
      navigate(`/search/${query}&orientation=${orientation}`);
    } else {
      navigate(`/search/${query}`);
    }

    setSearchValue('');

  };

  const handleOrientationChange = (e) => {
    const selected = e.target.value;
    const query = searchParams.get('query');

    if (query) {
      if (selected) {
        navigate(`/search/${query}&orientation=${selected}`);
      } else {
        navigate(`/search/${query}`);
      }
    } else {
      if (selected) {
        navigate(`/search?orientation=${selected}`);
      } else {
        navigate(`/`);
      }
    }
  };


  return (
    <>
    <div className="container">

      <div className='search-options'>
        <Link to="/">Photos</Link>
      </div>

      <form onSubmit={handleSubmit} className='search-bar-container'>

        <div className="search-bar">

          <input 
          className="search-input" 
          type="text" 
          placeholder="Search..." 
          value={searchValue} 
          onChange={handleInputChange}/>

          <button type="submit" className="search-icon">
            <IoIosSearch className='svg'/>
          </button>

        </div>

      </form>


      <label className="switch">

        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleTheme}
        />

        <span className="dark-mode-button">

          {darkMode ? (<IoMoonOutline className='icon icon-moon'/>) : (<IoSunnyOutline className='icon icon-sun'/>)}
          
        </span>

      </label>
    </div>

    <div>
      
    <div className="header-spacer"  style={{height: '4rem'}}/>

    <div className='options-container'>

      <div className='search-suggestions'>

        <a href="">Nature</a>
        <a href="">People</a>
        <a href="">Minimalism</a>

      </div>

      <div className='drop-down-container'>

        {/* <label 
        htmlFor="orientation-select" 
        style={{ marginRight: '0.5rem', color: 'var(--color-text)' }}>
          Orientation:
        </label> */}


        <select 
        value={searchParams.get('orientation') || ''} id="orientation-select" 
        onChange={handleOrientationChange}>

          <option value="">All</option>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="squarish">Square</option>

        </select>

      </div>

    </div>

    </div>
    </>
  )
}

export default Navbar