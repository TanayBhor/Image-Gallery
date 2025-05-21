import { useState } from 'react';
import './Header.css'
import { IoIosSearch } from "react-icons/io";

const Header = ({ searchValue, setSearchValue, onSearchSubmit }) => {

  // const [searchValue, setSearchValue] = useState('')

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit();
    setSearchValue('');
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit} className='search-bar-container'>

        <div className='search-options'>
          <a href="">Photos</a>
          <a href="">Illustrations</a>
        </div>

        <div className="search-bar">

          <input type="text" className="search-input" placeholder="Search..." value={searchValue} onChange={handleInputChange}/>

          <button type="submit" className="search-icon">
            <IoIosSearch className='svg'/>
          </button>

        </div>

      </form>

        <div className='options-container'>

          <div className='search-suggestions'>

            <a href="">Nature</a>
            <a href="">People</a>
            <a href="">Minimalism</a>

          </div>

          <div className='drop-down-container'>

            <select name="" id="">
              <option value="volvo">Orientation</option>
              <option value="volvo">All</option>
              <option value="saab">Portrait</option>
              <option value="mercedes">Landscape</option>
              <option value="audi">Square</option>
            </select>

          </div>

        </div>

        {/* <div className="glow"></div> */}
    </div>
  )
}

export default Header