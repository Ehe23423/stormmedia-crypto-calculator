import { Routes, Route } from 'react-router-dom';
import { UnifiedTerminal } from './components/UnifiedTerminal';
import './index.css';

export default function App() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<UnifiedTerminal />} />
        <Route path="*" element={<UnifiedTerminal />} />
      </Routes>
    </div>
  );
}
