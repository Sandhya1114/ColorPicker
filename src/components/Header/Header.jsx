
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
import CustomDropdown from './CustomDropdown';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Header({ history, user }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="logo">
          <img src="./logoDEsign.png" height={40} width={200} />
        </div>
        <nav className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/upload">Palette Generator</Link>
          <Link to="/palettes">Explore Palettes</Link>
          <CustomDropdown />
          {user ? (
            <span>{user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User'}</span>

          ) : (
            <Link to="/auth">
              <button>Sign In</button>
            </Link>
          )}
          {history.length > 0 && (
            <button className="historyBtn" onClick={() => navigate('/history')}>
              View History
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
