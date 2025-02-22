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
    <div className="fixed top-4 right-4 z-50">
      <select 
        value={i18n.language} 
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-gray-800 text-white border border-white/20 rounded px-2 py-1"
      >
        <option value="ru" className="bg-gray-800">RU</option>
        <option value="en" className="bg-gray-800">EN</option>
        <option value="uk" className="bg-gray-800">UK</option>
        <option value="es" className="bg-gray-800">ES</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher; 