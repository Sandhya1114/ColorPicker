// src/components/ProtectedRouteNotification.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import './protectedRouteNotification.css';

const ProtectedRouteNotification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, message } = location.state || {};

  return (
    <div className="protected-route-notification">
      <div className="notification-card">
        <h2>Authentication Required</h2>
        <p>{message || 'You need to be signed in to access this page.'}</p>
        <button 
          onClick={() => navigate('/auth', { state: { from } })}
          className="auth-redirect-button"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default ProtectedRouteNotification;
