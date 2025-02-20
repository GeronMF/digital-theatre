import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    navigate(`/${language}`);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-full ${
          i18n.language === 'en' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded-full ${
          i18n.language === 'es' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('uk')}
        className={`px-3 py-1 rounded-full ${
          i18n.language === 'uk' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
        }`}
      >
        UK
      </button>
      <button
        onClick={() => changeLanguage('ru')}
        className={`px-3 py-1 rounded-full ${
          i18n.language === 'ru' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
        }`}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher; 