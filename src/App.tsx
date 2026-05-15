import { useState } from 'react'
import './App.css'
import { declarationData } from './data/declaration'
import Paragraph from './components/Paragraph'
import DonationWidget from './components/DonationWidget'
import LanguageSwitcher from './components/LanguageSwitcher'
import FeedbackForm from './components/FeedbackForm'
import { useLanguage } from './context/LanguageContext'
import { translations } from './data/translations'

function App() {
  const { language } = useLanguage();
  const [view, setView] = useState<'declaration' | 'feedback'>('declaration');
  const t = translations[language];

  const currentDeclarationData = (declarationData as any)[language] || (declarationData as any)['en'];

  return (
    <div className="app-container">
      <LanguageSwitcher />
      
      <header className="hero">
        <h1>{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
        <p className="meta">{t.author}</p>
        <p className="date">{t.date}</p>
        {view === 'declaration' && (
          <div className="instruction">
            {t.instruction}
          </div>
        )}
      </header>
      
      <main className="main-content">
        {view === 'declaration' ? (
          <div className="declaration-body">
            {Array.isArray(currentDeclarationData) && currentDeclarationData.map((paragraph: any) => (
              <Paragraph key={paragraph.id} data={paragraph} />
            ))}
            <DonationWidget />
          </div>
        ) : (
          <FeedbackForm onBack={() => setView('declaration')} />
        )}
      </main>

      <footer className="footer">
        <p>{t.footer}</p>
        <div className="feedback-link">
          <button className="text-link" onClick={() => setView('feedback')}>
            {t.submitFeedback}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
