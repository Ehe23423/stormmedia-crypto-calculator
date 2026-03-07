import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UnifiedTerminal } from './components/UnifiedTerminal';
import { LanguageProvider } from './lib/LanguageContext';
import './index.css';

export default function App() {
  useEffect(() => {
    // Definitive scroll-lock breaker
    const unlock = () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.height = 'auto';
      document.body.classList.remove('antigravity-scroll-lock');
    };

    unlock();
    const timer = setInterval(unlock, 1000); // Keep it unlocked
    window.addEventListener('resize', unlock);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', unlock);
    };
  }, []);

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<UnifiedTerminal />} />
        <Route path="*" element={<UnifiedTerminal />} />
      </Routes>
    </LanguageProvider>
  );
}
