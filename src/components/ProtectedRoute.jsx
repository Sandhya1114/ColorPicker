// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ user, children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (!user) {
//       // Store intended path for redirect after login
//       navigate('/auth', { 
//         state: { 
//           from: location.pathname,
//           protected: true 
//         } 
//       });
//     }
//   }, [user, navigate, location]);

//   if (!user) {
//     // Optional: Show loading spinner here if desired
//     return null;
//   }

//   return children;
// };
const ProtectedRoute = ({ user, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!user || !user.email_confirmed_at) {
      // Store intended path for redirect after login
      navigate('/auth', { 
        state: { 
          from: location.pathname,
          protected: true 
        } 
      });
    }
  }, [user, navigate, location]);
  if (!user || !user.email_confirmed_at) {
    return null; // Optionally show a loading spinner
  }
  return children;
};

export default ProtectedRoute;
