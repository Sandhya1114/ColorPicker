import { Link,useNavigate } from 'react-router-dom';
import './historyPage.css';
import BottomFooter from '../Footer/BottomFooter';

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
           <button className="backBtn" ><Link to="/upload"> Palette Generator</Link></button>
          
          
          <h2 className='HistoryHeading'>Searched Images</h2>
          <p className='historyLine'>click on any image to get more clearly see and customize</p>
          {history.length === 0 ? (
            <>
              <button className="backBtn" ><Link to="/upload"> Palette Generator</Link></button>
              <h2>No history yet.</h2>
            </>
            
          ) : (
            <div>
               
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
             </div>
          )}
          
       </div>
      
       <BottomFooter/>
    </>
    
  );
}