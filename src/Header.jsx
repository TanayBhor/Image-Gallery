import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <div className="search-container">

        <div className="search-bar">

          <input type="text" className="search-input" placeholder="Search..." />

          <div className="search-icon">
            <IoIosSearch className='svg'/>
          </div>

        </div>

        <div className="glow"></div>
    </div>
  )
}

export default Header