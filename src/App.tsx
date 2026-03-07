import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UnifiedTerminal } from './components/UnifiedTerminal';
import { LanguageProvider } from './lib/LanguageContext';
import './index.css';

export default function App() {
  useEffect(() => {
    const DEPLOY_VERSION = "PRISTINE_PURGE_v2.0";
    console.log(`%c [SYSTEM] ${DEPLOY_VERSION} LOADED`, 'background: #00d2ff; color: #000; font-weight: bold;');

    const body = document.body;
    const html = document.documentElement;

    const forceUnlock = () => {
      // Force individual styles
      body.style.setProperty('overflow-y', 'visible', 'important');
      body.style.setProperty('overflow-x', 'visible', 'important');
      body.style.setProperty('height', 'auto', 'important');
      body.style.setProperty('position', 'static', 'important');

      html.style.setProperty('overflow-y', 'visible', 'important');
      html.style.setProperty('overflow-x', 'visible', 'important');
      html.style.setProperty('height', 'auto', 'important');
      html.style.setProperty('position', 'static', 'important');

      body.classList.remove('antigravity-scroll-lock');
    };

    // MutationObserver to catch anyone (including environment) trying to lock the scroll
    const observer = new MutationObserver(() => {
      if (body.classList.contains('antigravity-scroll-lock') || body.style.overflow === 'hidden') {
        forceUnlock();
      }
    });

    observer.observe(body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(html, { attributes: true, attributeFilter: ['style', 'class'] });

    forceUnlock();
    const timer = setInterval(forceUnlock, 1000);
    window.addEventListener('resize', forceUnlock);

    return () => {
      observer.disconnect();
      clearInterval(timer);
      window.removeEventListener('resize', forceUnlock);
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
