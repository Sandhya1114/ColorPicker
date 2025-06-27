import { useState,useEffect } from 'react';
import './gradientMaker.css';
import BottomFooter from '../Footer/BottomFooter';

export default function GradientMaker() {
    const [stops, setStops] = useState([
    { color: '#398C7D', pos: 0 },
    { color: '#425747', pos: 50 },
  ]);
  const [angle, setAngle] = useState(90);
  const [mode, setMode] = useState('linear');
  const [customInput, setCustomInput] = useState('');
  const [gradientCSS, setGradientCSS] = useState('');

  // Recompute on stops/mode/angle, but only if no custom override
  useEffect(() => {
    if (!customInput) {
      const built = mode === 'linear'
        ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`
        : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`;
      setGradientCSS(built);
    }
  }, [stops, angle, mode, customInput]);

  const updateStop = (i, key, val) => {
    setStops(arr => {
      const next = [...arr];
      next[i] = { ...next[i], [key]: key === 'pos' ? +val : val };
      return next;
    });
    setCustomInput('');
  };

  const applyCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed) {
      setGradientCSS(trimmed);
    }
  };



  return (
    <>
    <div className="gm-container">
      <div className="gm-toggle">
        <button onClick={() => { setMode('linear'); setCustomInput(''); }} className={mode==='linear'?'active':''}>Linear</button>
        <button onClick={() => { setMode('radial'); setCustomInput(''); }} className={mode==='radial'?'active':''}>Radial</button>
      </div>

      {mode === 'linear' && (
        <label className="gm-angle">
          Angle:
          <input type="range" min="0" max="360" value={angle}
            onChange={e => { setAngle(+e.target.value); setCustomInput(''); }} />
          {angle}°
        </label>
      )}


     <div className="gm-preview" style={{ background: gradientCSS }} />

      <div className="gm-controls">
        {stops.map((s, i) => (
          <div key={i} className="gm-stop">
            <input type="color" value={s.color}
              onChange={e => updateStop(i, 'color', e.target.value)} />
            <input type="range" min="0" max="100" value={s.pos}
              onChange={e => updateStop(i, 'pos', e.target.value)} />
            <span>{s.pos}%</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <textarea className="gm-css" readOnly rows={2}
          value={`background: ${gradientCSS};`} />
        <button  onClick={() => {
          navigator.clipboard.writeText(`background: ${gradientCSS};`);
        }} className='btnGray'>Copy CSS</button>
      </div>

      <div style={{ marginTop: '16px' }}>
        <label>Paste any gradient:</label>
        <textarea
          className="gm-css"
          rows={2}
          placeholder="e.g. linear-gradient(45deg, red, yellow)"
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
        />
        <button type="button" className='btnGray' onClick={applyCustom}>Preview Custom</button>
      </div>
    </div>

    
     {<BottomFooter/>}
    
    </>
    
  );
}