import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UnifiedTerminal } from './components/UnifiedTerminal';
import { LanguageProvider } from './lib/LanguageContext';
import './index.css';

export default function App() {
  useEffect(() => {
    const DEPLOY_VERSION = "v5.3_FINAL_RECOVERY";
    console.log(`%c [SYSTEM] ${DEPLOY_VERSION} LOADED`, 'background: #00d2ff; color: #000; font-weight: bold;');

    // Add visible marker to UI
    const marker = document.createElement('div');
    marker.style.cssText = "position:fixed;top:0;right:0;background:red;color:white;font-size:8px;z-index:999999;padding:2px;pointer-events:none;opacity:0.8";
    marker.innerText = DEPLOY_VERSION;
    document.body.appendChild(marker);

    const body = document.body;
    const html = document.documentElement;

    const forceUnlock = () => {
      body.style.setProperty('overflow-y', 'visible', 'important');
      body.style.setProperty('overflow-x', 'hidden', 'important');
      body.style.setProperty('height', 'auto', 'important');
      body.style.setProperty('position', 'static', 'important');

      html.style.setProperty('overflow-y', 'visible', 'important');
      html.style.setProperty('overflow-x', 'hidden', 'important');
      html.style.setProperty('height', 'auto', 'important');
      html.style.setProperty('position', 'static', 'important');

      body.classList.remove('antigravity-scroll-lock');
    };

    const observer = new MutationObserver(forceUnlock);
    observer.observe(body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(html, { attributes: true, attributeFilter: ['style', 'class'] });

    forceUnlock();
    const timer = setInterval(forceUnlock, 1000);

    return () => {
      observer.disconnect();
      clearInterval(timer);
      marker.remove();
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
