import { useState } from 'react';
import MemberCheckInDashboard from './components/MemberCheckInDashboard';

import './index.css';

export default function App() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <>
      {/* <h1>React + TypeScript environ 🧩</h1>
      <div className="result">{result ?? 'Result displays here...'}</div>
      <button className="action-button" onClick={() => setResult('Button clicked!')}>
        Run code!
      </button> */}

      <MemberCheckInDashboard />
    </>
  );
}
