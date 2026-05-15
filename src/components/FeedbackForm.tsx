import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const FeedbackForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [submitted, setStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setStatus('SUCCESS');
      form.reset();
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="feedback-form-container">
      <button className="back-button" onClick={onBack}>
        {t.backToDeclaration}
      </button>

      <h2>{t.submitFeedback}</h2>

      {submitted === 'SUCCESS' ? (
        <div className="success-message">{t.formSuccess}</div>
      ) : (
        <form 
          name="feedback" 
          method="POST" 
          data-netlify="true" 
          onSubmit={handleSubmit}
          className="feedback-form"
        >
          <input type="hidden" name="form-name" value="feedback" />
          <input type="hidden" name="language" value={language} />

          <div className="form-group">
            <label>{t.formType}</label>
            <select name="type" required>
              <option value="citation">{t.formNewCitation}</option>
              <option value="correction">{t.formCorrection}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t.formCitationType}</label>
            <select name="citation_category">
              <option value="traditional">{t.formTraditional}</option>
              <option value="modern">{t.formModern}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t.formParagraph}</label>
            <input type="text" name="paragraph" required placeholder="e.g. Paragraph 4" />
          </div>

          <div className="form-group">
            <label>{t.formDocument}</label>
            <input type="text" name="document" required />
          </div>

          <div className="form-group">
            <label>{t.formAuthor}</label>
            <input type="text" name="author" required />
          </div>

          <div className="form-group">
            <label>{t.formQuote}</label>
            <textarea name="quote" rows={4} required></textarea>
          </div>

          <div className="form-group">
            <label>{t.formExplanation}</label>
            <textarea name="explanation" rows={4} required></textarea>
          </div>

          <div className="form-group">
            <label>{t.formLink}</label>
            <input type="url" name="link" placeholder="https://..." />
          </div>

          <button type="submit" className="submit-button">
            {t.formSubmit}
          </button>

          {submitted === 'ERROR' && (
            <div className="error-message">{t.formError}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
