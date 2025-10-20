import { useState } from 'react';
// import MemberCheckInDashboard from './components/MemberCheckInDashboard';

import './index.css';

export default function App() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <>
      <h1>Mini React + TypeScript Playground 🧩</h1>
      <div className="result">{result ?? 'No result yet — click Run Code!'}</div>
      <div className="button-container">
        <button className="action-button" onClick={() => setResult('Code executed!')}>
          ▶️ Run Code
        </button>

        <button className="action-button" onClick={() => setResult(null)}>
          🔄 Reset
        </button>
      </div>

      {/* <MemberCheckInDashboard /> */}
    </>
  );
}
