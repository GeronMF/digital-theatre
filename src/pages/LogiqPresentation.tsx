import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LogiqPresentation = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Если язык в URL не совпадает с текущим языком
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
    // Если мы на странице без языка, но язык не английский
    if (!lang && i18n.language !== 'en') {
      navigate(`/${i18n.language}/logiq-e10`, { replace: true });
    }
  }, [lang, i18n.language]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          {t('products.logiq.title')}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          {t('products.logiq.description')}
        </p>
        {/* Здесь будет основной контент презентации */}
      </div>
    </div>
  );
};

export default LogiqPresentation; 