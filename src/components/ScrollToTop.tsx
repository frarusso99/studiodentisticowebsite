// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTop = 0;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Usa 'instant' invece di 'smooth' per evitare l'animazione
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;