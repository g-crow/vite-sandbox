import { useState } from 'react';
import './index.css';

export default function App() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div>
      <h1>Coding Sandbox 🧩</h1>
      <p style={{ color: '#5e7ea1', fontStyle: 'italic' }}>
        React + TypeScript environment
      </p>

      <div
        style={{
          background: 'white',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(79, 138, 139, 0.08)',
          minHeight: 140,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4f8a8b',
          whiteSpace: 'pre-wrap',
        }}
      >
        {result ?? 'Waiting for instructions...'}
      </div>

      <button
        style={{
          marginTop: 16,
          background: '#4f8a8b',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}
        onClick={() => setResult('Button clicked!')}
      >
        Run Example
      </button>
    </div>
  );
}
