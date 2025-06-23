
import CustomDropdown from './CustomDropdown';
import './Header.css';
import { Link,useNavigate } from 'react-router-dom';

export default function Header({ history }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="logo"> <img
              src="./ImgeLog1.png"
              height={40}
              width={200}
            /></div>
        <nav className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/upload">Palette Generator</Link>
          <Link to="/Palettes">Explore Palettes</Link>
          <CustomDropdown />
          <a href="#">Sign In</a>
          {history.length > 0 && (
            <button
              className="historyBtn"
              onClick={() => navigate('/history')}
            >
              View History
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

