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
        </Routes>
      
      </div>
       </Router>
      
    </>
   
  );
}

export default App;

// #000000
// #000001
// #000002
// ...F
// 00...FF