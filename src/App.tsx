import { Routes, Route } from 'react-router-dom';
import { UnifiedTerminal } from './components/UnifiedTerminal';
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<UnifiedTerminal />} />
        {/* Placeholder for any future deep links, but for now everything is on / */}
        <Route path="*" element={<UnifiedTerminal />} />
      </Routes>
    </div>
  );
}
