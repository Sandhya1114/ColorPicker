

// src/components/AuthPage/AuthPage.jsx
import { useState } from 'react';
import { supabase } from '../src/supabaseClient';// Import the Supabase client
import './AuthPage.css'; // Optional: Add your CSS styles

const AuthPage = ({ setUser  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      // Sign Up
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setUser (user);
      }
    } else {
      // Sign In
      const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // Use signInWithPassword
      if (error) {
        setError(error.message);
      } else {
        setUser (data.user); // Access user from data
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleAuth}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isSignUp ? 'Create Account' : 'Sign In'}</button>
      </form>
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;

    