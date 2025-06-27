import AuthButton from '../feature/AuthButton';
import CustomDropdown from './CustomDropdown';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ history, user, setUser  }) {
  const navigate = useNavigate();

  const handleProtectedNav = (path) => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: path,
          message: 'Please sign in to access this feature'
        } 
      });
    } else {
      navigate(path);
    }
  };
  
  return (
    <header className="header">
      <div className="headerContainer">
        <div className="logo">
          <img src="./logoDEsign.png" height={40} width={300} alt="Logo" />
        </div>
        <nav className="navLinks">
          <Link to="/" className="nav-link">Home</Link>
          <button 
            onClick={() => handleProtectedNav('/upload')}
            className="nav-link protected-link"
          >
            Palette Generator
          </button>
          <button 
            onClick={() => handleProtectedNav('/picker')}
            className="nav-link protected-link"
          >
            
            Color Picker
          </button>
          <Link to="/palettes" className="nav-link">Explore Palettes</Link>
          <CustomDropdown  history={history}/>
          <AuthButton user={user} setUser ={setUser } />
          {/* {history.length > 0 && (
            <button 
              onClick={() => handleProtectedNav('/history')}
              className="nav-link history-btn"
            >
              View History
            </button>
          )} */}
        </nav>
      </div>
    </header>
  );
}
