


// import { supabase } from './supabaseClient'; // Import the Supabase client
// import AuthPage from './components/feature/AuthPage'; 
// // src/App.jsx
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Home from './components/Home/Home';
// import ColorExtractor from './components/ColorExtractor/ColorExtractor';
// import HistoryPage from './components/History/HistoryPage';
// import ColorPaletteSearch from './components/Searching/ColorPaletteSearch';
// import colorData from './components/Palattes/Data/colorPalettes';
// import ColorPickerButton from './components/colorPicker/ColorPicker';
// import GradientMaker from './components/GradientMaker/GradientMaker';

// function HomeWrapper({ history, setHistory }) {
//   const location = useLocation();
//   return (
//     <ColorExtractor
//       history={history}
//       setHistory={setHistory}
//       initialItem={location.state}
//     />
//   );
// }

// function App() {
//    const [history, setHistory] = useState([]);
//   const [user, setUser ] = useState(null);
//   useEffect(() => {
//     const fetchSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setUser (session?.user ?? null);
//     };
//     fetchSession();
//     const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
//       setUser (session?.user ?? null);
//     });
//     return () => {
//       if (authListener) {
//         authListener.subscription.unsubscribe(); // Access the subscription object
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Router>
//         <div className="min-h-screen">
//           <Header history={history} user={user} />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/auth" element={<AuthPage setUser ={setUser } />} /> {/* Add AuthPage route */}
//             <Route path="/upload" element={<HomeWrapper history={history} setHistory={setHistory} />} />
//             <Route path='/palettes' element={<ColorPaletteSearch colorData={colorData} user={user} />} />
//             <Route path="/history" element={<HistoryPage history={history} />} />
//             <Route path="/picker" element={<ColorPickerButton />} />
//             <Route path="/gradient" element={<GradientMaker />} />
//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;
// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AuthPage from './components/feature/AuthPage';
import ColorExtractor from './components/ColorExtractor/ColorExtractor';
import HistoryPage from './components/History/HistoryPage';
import ColorPaletteSearch from './components/Searching/ColorPaletteSearch';
import colorData from './components/Palattes/Data/colorPalettes';
import ColorPickerButton from './components/colorPicker/ColorPicker';
import GradientMaker from './components/GradientMaker/GradientMaker';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteNotification from './components/ProtectedRouteNotification';
import ImageColorEditor from "./components/Preview/ImageColorEditor";
import ColorReplacerr from './components/Experimant/experimant';

function App() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
   
    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        // Refresh session on auth state changes
        if (event === 'SIGNED_IN') {
          fetchSession();
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Header history={history} user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          
          {/* Protected Routes */}
          {/* <Route path="/upload" element={
            // <ProtectedRoute user={user}>
              <ColorExtractor history={history} setHistory={setHistory} user={user} setUser={setUser} />
            // </ProtectedRoute>
          } /> */}
          <Route path="/upload" element={<HomeWrapper history={history} setHistory={setHistory} />} />
          
          <Route path="/picker" element={
            // <ProtectedRoute user={user}>
              <ColorPickerButton />
            // </ProtectedRoute>
          } />
          
          {/* Public Routes */}
          {/* <Route path="/palettes" element={<ColorPaletteSearch colorData={colorData} user={user} />} /> */}
          <Route path="/palettes" element={
            
              <ColorPaletteSearch colorData={colorData} user={user} />
           
          } />
          <Route path="/history" element={
            // <ProtectedRoute user={user}>
              <HistoryPage history={history} user={user} />
            // </ProtectedRoute>
          } />
          {/* <Route path="/gradient" element={<GradientMaker user={user} />} /> */}
          <Route path="/gradient" element={
            // <ProtectedRoute user={user}>
              <GradientMaker user={user} />
            // </ProtectedRoute>
          } />
          <Route path="/imagePreview" element={<ColorReplacerr/>}/>
          {/* <Route path="/imagePreview" element={
            <ProtectedRoute user={user}>
              <ColorReplacerr />
            </ProtectedRoute>
          } /> */}
          {/* Fallback for protected route attempts */}
          <Route path="/protected-notification" element={<ProtectedRouteNotification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
