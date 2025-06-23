import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthContext from '../../Context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUser  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Replace this with your actual authentication logic
    try {
      // Simulate API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          success: true,
          user: { name: email.split('@')[0], email } // Extract name from email
        }), 500)
      );

      if (response.success) {
        setIsAuthenticated(true);
        setUser (response.user);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          Login
        </button>
        
        <div className="signup-link">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
