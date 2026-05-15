import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'it', label: 'IT' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button
            className={`lang-btn ${language === lang.code ? 'active' : ''}`}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && <span className="lang-separator">|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
