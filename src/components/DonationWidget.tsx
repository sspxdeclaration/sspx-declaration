import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const DonationWidget: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const btcAddress = "bc1qxdlk0tks3hfc2zuusxg0fa59rljmc2704jvayr";
  const btcUri = `bitcoin:${btcAddress}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(btcAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="donation-widget">
      <h4>{t.supportTitle}</h4>
      <p>{t.supportText}</p>
      
      <div className="btc-qr-container">
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${btcUri}`} 
          alt="Bitcoin QR Code" 
          className="btc-qr" 
        />
      </div>

      <div className="btc-actions">
        <a href={btcUri} className="action-button wallet-button">
          {t.openInWallet}
        </a>
        <button 
          className={`action-button copy-button ${copied ? 'copied' : ''}`} 
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? t.copied : t.copyAddress}
        </button>
      </div>

      <div className="btc-address-container">
        <code className="btc-address">{btcAddress}</code>
      </div>
    </div>
  );
};

export default DonationWidget;