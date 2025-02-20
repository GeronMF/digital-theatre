import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const QashqaiPresentation = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Если язык в URL не совпадает с текущим языком
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
    // Если мы на странице без языка, но язык не английский
    if (!lang && i18n.language !== 'en') {
      navigate(`/${i18n.language}/qashqai-presentation`, { replace: true });
    }
  }, [lang, i18n.language]);

  return (
    <div>
      {/* Контент страницы */}
    </div>
  );
};

export default QashqaiPresentation; 