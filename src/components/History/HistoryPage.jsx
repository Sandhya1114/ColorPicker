// import { Link,useNavigate } from 'react-router-dom';
// import './Historypage.css';
// import BottomFooter from '../Footer/BottomFooter';

// function rgbToHex(r, g, b) {
//   return (
//     '#' +
//     [r, g, b]
//       .map((x) => {
//         const hex = x.toString(16);
//         return hex.length === 1 ? '0' + hex : hex;
//       })
//       .join('')
//   );
// }

// export default function HistoryPage({ history }) {
//   const navigate = useNavigate();

//   const handleSelect = (item) => {
//     navigate('/upload', { state: item });
//   };

//   return (
//     <>
//        <div className="historyPageContainer">
//           <button className="backBtn" onClick={() => navigate(-1)}>← Back</button>
//            <button className="backBtn" ><Link to="/upload"> Palette Generator</Link></button>
          
          
//           <h2 className='HistoryHeading'>Searched Images</h2>
//           <p className='historyLine'>click on any image to get more clearly see and customize</p>
//           {history.length === 0 ? (
//             <>
//               <button className="backBtn" ><Link to="/upload"> Palette Generator</Link></button>
//               <h2>No history yet.</h2>
//             </>
            
//           ) : (
//             <div>
               
//             <div className="historyList">
//               {history.map((item, idx) => (
//                 <div key={idx} className="historyItem" onClick={() => handleSelect(item)}>
//                   <img src={item.src} alt={`History-${idx}`} className="historyThumb" />
//                   <div className="colorGrid">
//                     {item.palette.map((c, i) => (
//                       <div key={i} className="colorSwatch">
//                         <div className="colorBox" style={{ backgroundColor: rgbToHex(...c) }} />
//                         <span className="hexCode">{rgbToHex(...c)}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//              </div>
//           )}
          
//        </div>
      
//        <BottomFooter/>
//     </>
    
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Historypage.css';
import BottomFooter from '../Footer/BottomFooter';

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b].map((x) =>
      x.toString(16).padStart(2, '0')
    ).join('')
  );
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('colorHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSelect = (item) => {
    navigate('/upload', { state: item });
  };

  return (
    <div className="historyPageContainer">
      <button onClick={() => navigate(-1)} className="backBtn">
        ← Back
      </button>
      <button className="backBtn" onClick={() => navigate('/upload')}>
        Palette Generator
      </button>

      <h2 className="HistoryHeading">Searched Images</h2>
      <p className="historyLine">
        Click an image to edit or re-generate its palette
      </p>

      {history.length === 0 ? (
        <>
          <h2>No history yet.</h2>
        </>
      ) : (
        <div className="historyList">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="historyItem"
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.src}
                alt={`History-${idx}`}
                className="historyThumb"
              />
              <div className="colorGrid">
                {item.palette.map((c, i) => (
                  <div key={i} className="colorSwatch">
                    <div
                      className="colorBox"
                      style={{ backgroundColor: rgbToHex(...c) }}
                    />
                    <span className="hexCode">
                      {rgbToHex(...c)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <BottomFooter />
    </div>
  );
}
