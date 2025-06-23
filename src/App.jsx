// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Home from './components/Home/Home';
// import ColorExtractor from './components/ColorExtractor/ColorExtractor';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/upload" element={<ColorExtractor />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ColorExtractor from './components/ColorExtractor/ColorExtractor';
import HistoryPage from './components/History/HistoryPage';
import ColorPaletteSearch from './components/Searching/ColorPaletteSearch';
import colorData from './components/Palattes/Data/colorPalettes';
import ColorPickerButton from './components/colorPicker/ColorPicker';
import GradientMaker from './components/GradientMaker/GradientMaker';

function HomeWrapper({ history, setHistory }) {
  const location = useLocation();
  return (
    <ColorExtractor
      history={history}
      setHistory={setHistory}
      initialItem={location.state}
    />
  );
}

function App() {
  const [history, setHistory] = useState([]);

  return (
    <>
        <Router>
      <div className="min-h-screen">
        <Header history={history} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<HomeWrapper history={history} setHistory={setHistory} />}/>
          <Route path='/palettes' element={<ColorPaletteSearch colorData={colorData} />}/>
          <Route path="/history" element={<HistoryPage history={history} />} />
          <Route path="/picker" element={<ColorPickerButton/> } />
          <Route path="/gradient" element={<GradientMaker/> } />
          
        </Routes>
      
      </div>
       </Router>
      
    </>
   
  );
}

export default App;

// import { useState,useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Home from './components/Home/Home';
// import ColorExtractor from './components/ColorExtractor/ColorExtractor';
// import HistoryPage from './components/History/HistoryPage';
// import ColorPaletteSearch from './components/Searching/ColorPaletteSearch';
// import colorData from './components/Palattes/Data/colorPalettes';
// import ColorPickerButton from './components/colorPicker/ColorPicker';
// import GradientMaker from './components/GradientMaker/GradientMaker';
// import Login from './components/Login/Login';
// import AuthContext from './Context/AuthContext';

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

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? children : <Navigate to="/login" />;
// }

// function App() {
//   const [history, setHistory] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const authContextValue = {
//     isAuthenticated,
//     setIsAuthenticated,
//     user,
//     setUser
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       <Router>
//         <div className="min-h-screen">
//           <Header history={history} />
          
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
            
//             {/* Protected routes */}
//             <Route path="/upload" element={
             
//                 <HomeWrapper history={history} setHistory={setHistory} />
              
//             }/>
            
//             <Route path='/palettes' element={
//               <ProtectedRoute>
//                 <ColorPaletteSearch colorData={colorData} />
//               </ProtectedRoute>
//             }/>
            
//             <Route path="/history" element={
              
//                 <HistoryPage history={history} />
            
//             } />
            
//             <Route path="/picker" element={
             
//                 <ColorPickerButton />
              
//             } />
            
//             <Route path="/gradient" element={
             
//                 <GradientMaker />
             
//             } />
//           </Routes>
//         </div>
//       </Router>
//     </AuthContext.Provider>
//   );
// }

// export default App;
