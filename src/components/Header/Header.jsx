
// import CustomDropdown from './CustomDropdown';
// import './Header.css';
// import { Link,useNavigate } from 'react-router-dom';

// export default function Header({ history }) {
//   const navigate = useNavigate();

//   return (
//     <header className="header">
//       <div className="headerContainer">
//         <div className="logo"> <img
//               src="./logoDEsign.png"
//               height={40}
//               width={200}
//             /></div>
//         <nav className="navLinks">
//           <Link to="/">Home</Link>
//           <Link to="/upload">Palette Generator</Link>
//           <Link to="/Palettes">Explore Palettes</Link>
//           <CustomDropdown />
//           <a href="#">Sign In</a>
//           {history.length > 0 && (
//             <button
//               className="historyBtn"
//               onClick={() => navigate('/history')}
//             >
//               View History
//             </button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
// src/components/Header/Header.jsx



// import CustomDropdown from './CustomDropdown';
// import './Header.css';
// import { Link, useNavigate } from 'react-router-dom';


// export default function Header({ history, user }) {
//   const navigate = useNavigate();

//   return (
//     <header className="header">
//       <div className="headerContainer">
//         <div className="logo">
//           <img src="./logoDEsign.png" height={40} width={200} />
//         </div>
//         <nav className="navLinks">
//           <Link to="/">Home</Link>
//           <Link to="/upload">Palette Generator</Link>
//           <Link to="/palettes">Explore Palettes</Link>
//           <CustomDropdown />
//           {user ? (
//             <span>{user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User'}</span>

//           ) : (
//             <Link to="/auth">
//               <button>Sign In</button>
//             </Link>
//           )}
//           {history.length > 0 && (
//             <button className="historyBtn" onClick={() => navigate('/history')}>
//               View History
//             </button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// src/components/Header/Header.jsx
import AuthButton from '../feature/AuthButton';
import CustomDropdown from './CustomDropdown';
import './Header.css'; // Ensure this imports your existing styles
import { Link, useNavigate } from 'react-router-dom';
// import AuthButton from '../AuthButton/AuthButton';

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
          <img src="./logoDEsign.png" height={40} width={200} alt="Logo" />
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
          <CustomDropdown user={user} setUser ={setUser } history={history}/>
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
