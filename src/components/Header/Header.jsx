// Header.jsx
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="headerContainer">
        <div className="logo">Color Picker</div>
        <nav className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
          <a href="#">Tools</a>
          <a href="#">Sign In</a>
        </nav>
      </div>
    </header>
  );
}
