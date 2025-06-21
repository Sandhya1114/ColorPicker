import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';
import Footer from '../Footer/Footer';

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

export default function HistoryPage({ history }) {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    navigate('/upload', { state: item });
  };

  return (
    <>
       <div className="historyPageContainer">
      <button className="backBtn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Image History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <div className="historyList">
          {history.map((item, idx) => (
            <div key={idx} className="historyItem" onClick={() => handleSelect(item)}>
              <img src={item.src} alt={`History-${idx}`} className="historyThumb" />
              <div className="colorGrid">
                {item.palette.map((c, i) => (
                  <div key={i} className="colorSwatch">
                    <div className="colorBox" style={{ backgroundColor: rgbToHex(...c) }} />
                    <span className="hexCode">{rgbToHex(...c)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
       </div>
       <Footer/>
    </>
    
  );
}