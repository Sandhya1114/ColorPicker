// import { useState } from 'react';
// import { supabase } from '../../supabaseClient';
// import './AuthButton.css';

// const AuthButton = ({ user, setUser  }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) setUser (null);
//     setShowDropdown(false);
//   };

//   // Get the user's avatar URL with fallbacks
//   const getAvatarUrl = () => {
//     // 1. First try the avatar_url from user_metadata
//     if (user?.user_metadata?.avatar_url) {
//       return user.user_metadata.avatar_url;
//     }
    
//     // 2. Try to get gravatar or generated avatar based on email
//     if (user?.email) {
//       return `https://unavatar.io/${user.email}`;
//     }
    
//     // 3. Fallback to initials avatar
//     const name = user?.user_metadata?.name || 'U';
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
//   };

//   // Get the display name with fallback to email
//   const getDisplayName = () => {
//     return user?.name || user?.email?.split('@')[0] || 'User ';
//   };

//   return (
//     <div className="auth-button-container">
//       {user ? (
//         <div className="user-profile">
//           <button 
//             className="user-avatar-btn"
//             onClick={() => setShowDropdown(!showDropdown)}
//             aria-label="User  menu"
//           >
//             <img
//               src={getAvatarUrl()}
//               alt="User  avatar"
//               className="user-avatar"
//               onError={(e) => {
//                 // Fallback if the image fails to load
//                 e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                   getDisplayName()
//                 )}&background=random`;
//               }}
//             />
//           </button>
          
//           {showDropdown && (
//             <div className="dropdown-menu">
//               <div className="user-info">
//                 <p className="user-name">{getDisplayName()}</p>
//                 <p className="user-email">{user.email}</p>
//               </div>
//               <button 
//                 className="logout-btn"
//                 onClick={handleLogout}
//               >
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <button 
//           className="login-btn"
//           onClick={() => window.location.href = '/auth'}
//         >
//           Sign In
//         </button>
//       )}
//     </div>
//   );
// };

// export default AuthButton;
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import './AuthButton.css';

const AuthButton = ({ user, setUser  }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) setUser (null);
    setShowDropdown(false);
  };
    
   

  // Get the user's avatar URL with fallbacks
  const getAvatarUrl = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    if (user?.email) {
      return `https://unavatar.io/${user.email}`;
    }
    const name = user?.user_metadata?.name || 'U';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  };

  // Get the display name with fallback to email
  const getDisplayName = () => {
    return user?.user_metadata?.name || user?.email?.split[0] || 'User ';
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="auth-button-container">
      {user ? (
        <div className="user-profile" ref={dropdownRef}>
          <button 
            className="user-avatar-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="User  menu"
          >
            <img
              src={getAvatarUrl()}
              alt="User  avatar"
              className="user-avatar"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  getDisplayName()
                )}&background=random`;
              }}
            />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="user-info">
                <p className="user-name">{getDisplayName()}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button 
          className="login-btn"
          onClick={() => window.location.href = '/auth'}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default AuthButton;
