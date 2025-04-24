// src/components/IubendaCookieBanner.tsx
import { useEffect } from 'react';

const IubendaCookieBanner = () => {
  useEffect(() => {
    // Script di configurazione
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      var _iub = _iub || [];
      _iub.csConfiguration = {
        "siteId": 4007092,
        "cookiePolicyId": 55906244,
        "lang": "it",
        "storage": {"useSiteId": true}
      };
    `;
    document.head.appendChild(configScript);

    // Script di autoblocking
    const autoBlockingScript = document.createElement('script');
    autoBlockingScript.type = 'text/javascript';
    autoBlockingScript.src = 'https://cs.iubenda.com/autoblocking/4007092.js';
    document.head.appendChild(autoBlockingScript);

    // Script principale di Iubenda
    const mainScript = document.createElement('script');
    mainScript.type = 'text/javascript';
    mainScript.src = '//cdn.iubenda.com/cs/iubenda_cs.js';
    mainScript.charset = 'UTF-8';
    mainScript.async = true;
    document.head.appendChild(mainScript);

    return () => {
      // Pulizia quando il componente viene smontato
      document.head.removeChild(configScript);
      document.head.removeChild(autoBlockingScript);
      if (mainScript.parentNode) { // Il terzo script è asincrono, potrebbe non essere ancora caricato
        document.head.removeChild(mainScript);
      }
    };
  }, []);

  return null; // Questo componente non renderizza elementi visibili
};

export default IubendaCookieBanner;