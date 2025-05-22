import { useState } from 'react';
import './Header.css'
import { IoIosSearch } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

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

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
    <div className="container">

      <div className='search-options'>

        <a href="">Photos</a>
        <a href="">Illustrations</a>

      </div>

      <form onSubmit={handleSubmit} className='search-bar-container'>

        <div className="search-bar">

          <input className="search-input" type="text" placeholder="Search..." value={searchValue} onChange={handleInputChange}/>

          <button type="submit" className="search-icon">
            <IoIosSearch className='svg'/>
          </button>

        </div>

      </form>

      <label className="switch">

        <input
          type="checkbox"
          id="checkbox"
          checked={checked}
          onChange={handleChange}
        />

        <span className="dark-mode-button">

          {checked ? (<IoMoonOutline className='icon icon-moon'/>) : (<IoSunnyOutline className='icon icon-sun'/>)}
          
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
    </>
  )
}

export default Header