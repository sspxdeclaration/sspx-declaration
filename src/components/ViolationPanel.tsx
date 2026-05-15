import React from 'react';
import type { Violation, AuthenticTeaching } from '../data/declaration';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface ViolationPanelProps {
  violations: Violation[];
  authenticTeaching?: AuthenticTeaching;
}

const ViolationPanel: React.FC<ViolationPanelProps> = ({ violations, authenticTeaching }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="violation-panel">
      {violations.length > 0 && (
        <div className="contradictions-section">
          <h3 className="contradiction-header">{t.modernContradictions}</h3>
          {violations.map((v, index) => (
            <div key={index} className="violation-item contradiction-item">
              <h4>{v.title}</h4>
              
              <div className="author-doc-info contradiction-info">
                <span className="violation-author"><strong>{t.source}:</strong> {v.author}</span>
                <span className="violation-doc"><strong>{t.document}:</strong> {v.document}</span>
              </div>

              <p className="violation-explanation">{v.explanation}</p>
              
              <div className="citation-box contradiction-citation-box">
                <span className="citation-label contradiction-label">{t.modernCitation}:</span>
                <blockquote className="violation-citation">
                  {v.citation}
                </blockquote>
              </div>

              <div className="source-link-wrapper">
                <a 
                  href={v.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="source-link contradiction-link"
                >
                  {t.readFull}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {authenticTeaching && (
        <div className="authentic-teaching-section">
          <h3 className="authentic-header">{t.traditionalTeaching}</h3>
          <div className="violation-item authentic-item">
            <h4>{authenticTeaching.title}</h4>
            <div className="author-doc-info authentic-info">
              <span className="violation-author"><strong>{t.source}:</strong> {authenticTeaching.author} ({authenticTeaching.year})</span>
              <span className="violation-doc"><strong>{t.document}:</strong> {authenticTeaching.document}</span>
            </div>
            <div className="citation-box authentic-citation-box">
              <span className="citation-label authentic-label">{t.traditionalCitation}:</span>
              <blockquote className="violation-citation authentic-blockquote">
                {authenticTeaching.citation}
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViolationPanel;
