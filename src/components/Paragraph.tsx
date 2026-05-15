import React, { useState } from 'react';
import type { DeclarationParagraph } from '../data/declaration';
import ViolationPanel from './ViolationPanel';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface ParagraphProps {
  data: DeclarationParagraph;
}

const Paragraph: React.FC<ParagraphProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className={`paragraph-container ${isOpen ? 'open' : ''}`}>
      <div 
        className="declaration-text-wrapper" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="declaration-text">
          {data.text}
        </p>
        {(data.violations.length > 0 || data.authenticTeaching) && (
          <span className="expand-hint">
            {isOpen ? t.hideContradictions : t.viewContradictions}
          </span>
        )}
      </div>
      {isOpen && (data.violations.length > 0 || data.authenticTeaching) && (
        <ViolationPanel 
          violations={data.violations} 
          authenticTeaching={data.authenticTeaching} 
        />
      )}
    </div>
  );
};

export default Paragraph;
