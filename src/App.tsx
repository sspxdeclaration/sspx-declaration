import './App.css'
import { declarationData } from './data/declaration'
import Paragraph from './components/Paragraph'
import DonationWidget from './components/DonationWidget'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useLanguage } from './context/LanguageContext'
import { translations } from './data/translations'

function App() {
  const { language } = useLanguage();
  const t = translations[language];

  // Fallback to English if translation data is missing for the current language temporarily
  const currentDeclarationData = (declarationData as any)[language] || (declarationData as any)['en'] || declarationData;

  return (
    <div className="app-container">
      <LanguageSwitcher />
      
      <header className="hero">
        <h1>{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
        <p className="meta">{t.author}</p>
        <p className="date">{t.date}</p>
        <div className="instruction">
          {t.instruction}
        </div>
      </header>
      
      <main className="declaration-body">
        {Array.isArray(currentDeclarationData) && currentDeclarationData.map((paragraph: any) => (
          <Paragraph key={paragraph.id} data={paragraph} />
        ))}
      </main>

      <DonationWidget />

      <footer className="footer">
        <p>{t.footer}</p>
        <div className="feedback-link">
          <a href="https://github.com/sspxdeclaration/sspx-declaration/issues/new/choose" target="_blank" rel="noopener noreferrer">
            {t.submitFeedback} ↗
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
