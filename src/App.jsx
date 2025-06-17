import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ColorExtractor from './components/ColorExtractor/ColorExtractor';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ColorExtractor />} />
      </Routes>
    </Router>
  );
}

export default App;
