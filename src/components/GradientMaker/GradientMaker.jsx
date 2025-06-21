import { useState } from 'react';
import './GradientMaker.css';

export default function GradientMaker() {
  const [stops, setStops] = useState([
    { color: '#398C7D', pos: 0 },
    { color: '#0A3431', pos: 50 },
  ]);
  const [angle, setAngle] = useState(90);
  const [mode, setMode] = useState('linear'); // or 'radial'

  const updateStop = (idx, key, value) => {
    const arr = [...stops];
    arr[idx][key] = key === 'pos' ? +value : value;
    setStops(arr);
  };

  const gradientCSS =
    mode === 'linear'
      ? `linear-gradient(${angle}deg, ${stops.map(s =>` ${s.color} ${s.pos}%`).join(', ')})`
      : `radial-gradient(circle, ${stops.map(s =>`${s.color} ${s.pos}%`).join(', ')})`;

  return (
    <>
    <div className='gradient'>
      <h1>Gradient Maker</h1>
      <p>Make gradient that you want</p>
    </div>
    <div className="gm-container">
      <div className="gm-toggle">
        <button onClick={() => setMode('linear')} className={mode === 'linear' ? 'active' : ''}>Linear</button>
        <button onClick={() => setMode('radial')} className={mode === 'radial' ? 'active' : ''}>Radial</button>
      </div>

      {mode === 'linear' && (
        <label className="gm-angle">
          Angle:
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={e => setAngle(+e.target.value)}
          />
          {angle}°
        </label>
      )}

      <div className="gm-preview" style={{ background: gradientCSS }} />

      <div className="gm-controls">
        {stops.map((s, i) => (
          <div key={i} className="gm-stop">
            <input
              type="color"
              value={s.color}
              onChange={e => updateStop(i, 'color', e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={s.pos}
              onChange={e => updateStop(i, 'pos', e.target.value)}
            />
            <span>{s.pos}%</span>
          </div>
        ))}
      </div>

      <textarea
        className="gm-css"
        readOnly
        rows={2}
        value={`background: ${gradientCSS};`}
      />
    </div>
    
    
    
    </>
    
  );
}