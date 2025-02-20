import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import LandingPage from './pages/LandingPage';

// Компонент-обертка для страниц с поддержкой языка проверка деплоя 2
const LocalizedRoute = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <LanguageSwitcher />
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Только главная страница */}
        <Route path="/" element={<LocalizedRoute><LandingPage /></LocalizedRoute>} />
        <Route path="/:lang" element={<LocalizedRoute><LandingPage /></LocalizedRoute>} />
      </Routes>
      {/* Desktop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source
          src="/media/videos/1739134367455340.mp4"
          type="video/mp4"
        />
      </video>
      {/* Mobile Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source
          src="/media/videos/1739134367455340.mp4"
          type="video/mp4"
        />
      </video>
    </BrowserRouter>
  );
}

export default App;