// import { useState } from 'react';
// import { supabase } from '../../supabaseClient';// Import the Supabase client
// import './AuthPage.css'; 

// const AuthPage = ({ setUser  }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState(null);

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (isSignUp) {
//       // Sign Up
//       const { user, error } = await supabase.auth.signUp({ email, password });
//       if (error) {
//         setError(error.message);
//       } else {
//         setUser (user);
//       }
//     } else {
//       // Sign In
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // Use signInWithPassword
//       if (error) {
//         setError(error.message);
//       } else {
//         setUser (data.user); // Access user from data
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
//       <form onSubmit={handleAuth}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">{isSignUp ? 'Create Account' : 'Sign In'}</button>
//       </form>
//       <p>
//         {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//         <button onClick={() => setIsSignUp(!isSignUp)}>
//           {isSignUp ? 'Sign In' : 'Sign Up'}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthPage;

  // src/components/AuthPage/AuthPage.jsx
// import { useState } from 'react';
// import { supabase } from '../../supabaseClient';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './AuthPage.css';


// const AuthPage = ({ setUser }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from || '/';

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         // Validate name field for sign-up
//         if (!name.trim()) {
//           throw new Error('Please enter your name');
//         }

//         // Sign Up with name in user_metadata
//         const { data, error: signUpError } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: {
//               name: name.trim(),
//               avatar_url: `https://unavatar.io/${email}`
//             }
//           }
//         });
//         if (signUpError) throw signUpError;
//         setUser(data.user);
//       } else {
//         // Sign In
//         const { data, error: signInError } = await supabase.auth.signInWithPassword({
//           email,
//           password
//         });
//         if (signInError) throw signInError;
//         setUser(data.user);
//       }
//       navigate(from, { replace: true });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page-container">
//       <div className="auth-card">
//         <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        
//         <form onSubmit={handleAuth} className="auth-form">
//           {error && <div className="auth-error">{error}</div>}
          
//           {/* Email Field */}
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="your@email.com"
//             />
//           </div>

//           {/* Name Field (shown only during sign-up) */}
//           {isSignUp && (
//             <div className="form-group">
//               <label>Full Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
//           )}

//           {/* Password Field */}
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//               placeholder={isSignUp ? "At least 6 characters" : "Your password"}
//             />
//           </div>

//           <button type="submit" className="auth-submit-btn" disabled={loading}>
//             {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
//           </button>
//         </form>

//         <div className="auth-switch">
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//           <button 
//             type="button"
//             onClick={() => {
//               setIsSignUp(!isSignUp);
//               setError(null);
//             }}
//             className="auth-switch-btn"
//           >
//             {isSignUp ? 'Sign In' : 'Create Account'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


// /**
//  * User Flow:
// 1. Click "Login" in Header (AuthButton) → Redirect to /auth
// 2. AuthPage shows login form → User submits credentials
// 3. On success: AuthPage updates auth state → Redirects user
// 4. Header now shows user avatar (AuthButton detects logged-in state)
//  */
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import './authPage.css';

const AuthPage = ({ setUser  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        // Validate name field for sign-up
        if (!name.trim()) {
          throw new Error('Please enter your name');
        }

        // Sign Up with name in user_metadata
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name.trim(),
              avatar_url: `https://unavatar.io/${email}`
            }
          }
        });

        if (signUpError) throw signUpError;

        // Notify user to check their email for verification
        alert('Please check your email for a verification link.');
      } else {
        // Sign In
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;

        // Check if the user has verified their email
        if (!data.user.email_confirmed_at) {
          throw new Error('Please verify your email before logging in.');
        }

        setUser (data.user);
      }

      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        
        <form onSubmit={handleAuth} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          {/* Email Field */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Name Field (shown only during sign-up) */}
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {/* Password Field */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder={isSignUp ? "At least 6 characters" : "Your password"}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="auth-switch-btn"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
