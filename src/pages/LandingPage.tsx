import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Star, Award, Users, ShoppingBag, ArrowRight, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import gsap from 'gsap';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm';
import ScrollToTopButton from '../components/ScrollToTopButton';
// Импортируйте остальные необходимые компоненты и иконки

// Компонент для анимации появления
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

// Компонент для параллакс-эффекта
const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

// Компонент карточки продукта
const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Формируем URL с учетом текущего языка
  const productUrl = currentLang === 'en' ? product.link : `/${currentLang}${product.link}`;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-[calc(100%-4.5rem)] md:translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl">
          <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl text-purple-400">{product.price}</span>
            <a 
              href={productUrl}
              className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-400 hover:text-white transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              {t('products.cta')}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ResponsiveSection = () => {
  const { t } = useTranslation();
  const features = t('responsive.adaptive.features', { returnObjects: true }) as string[];
  const crossBrowserFeatures = t('responsive.crossbrowser.features', { returnObjects: true }) as string[];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t('responsive.title')}
          </h2>
        </FadeInSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <FadeInSection delay={0.2}>
            <div className="bg-gray-800 p-6 rounded-lg h-full">
              <div className="mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/media/images/responsive/21-photo-1526925539332-aa3b66e35444.jpeg"
                  alt={t('responsive.adaptive.title')}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t('responsive.adaptive.title')}</h3>
              <ul className="space-y-3">
                {features.map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={0.4}>
            <div className="bg-gray-800 p-6 rounded-lg h-full">
              <div className="mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/media/images/responsive/22-photo-1481487196290-c152efe083f5.jpeg"
                  alt={t('responsive.crossbrowser.title')}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t('responsive.crossbrowser.title')}</h3>
              <ul className="space-y-3">
                {crossBrowserFeatures.map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.6}>
            <div className="bg-gray-800 p-6 rounded-lg h-full">
              <div className="mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/media/images/responsive/23-photo-1498050108023-c5249f4df085.jpeg"
                  alt={t('responsive.testing.title')}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">{t('responsive.testing.title')}</h3>
                <p className="text-xl mb-4">{t('responsive.testing.description')}</p>
                <div className="flex justify-center space-x-4">
                  <span className="text-4xl">📱</span>
                  <span className="text-4xl">💻</span>
                  <span className="text-4xl">🖥️</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".hero-title", ".hero-subtitle", ".hero-cta"], { 
        opacity: 0,
        y: 100 
      });

      gsap.to(".hero-title", {
        duration: 1.5,
        y: 0,
        opacity: 1,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.to(".hero-subtitle", {
        duration: 1.5,
        y: 0,
        opacity: 1,
        ease: "power4.out",
        delay: 0.8
      });

      gsap.to(".hero-cta", {
        duration: 1.5,
        y: 0,
        opacity: 1,
        ease: "power4.out",
        delay: 1.1
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const products = [
    {
      image: "/media/images/products/photo-1563461660947-507ef49e9c47.jpeg",
      title: t('products.qashqai.title'),
      description: t('products.qashqai.description'),
      price: "₽89,999",
      link: "https://digital-theatre.pro/qashqai-presentation"
    },
    {
      image: "/media/images/products/photo-1563461660947-507ef49e9c47.jpeg",
      title: t('products.logiq.title'),
      description: t('products.logiq.description'),
      price: "₽64,999",
      link: "https://digital-theatre.pro/logiq-e10"
    },
    {
      image: "/media/images/products/photo-1634017839464-5c339ebe3cb4.jpeg",
      title: t('products.apartment.title'),
      description: t('products.apartment.description'),
      price: "₽129,999",
      link: "/apartment-presentation"
    },
    {
      image: "/media/images/products/photo-1535223289827-42f1e9919769.jpeg",
      title: t('products.kitchen.title'),
      description: t('products.kitchen.description'),
      price: "₽159,999",
      link: "/professional-kitchen-equipment"
    }
  ];

  const features = [
    {
      icon: <Play className="w-12 h-12 text-purple-400" />,
      title: t('features.immersive.title'),
      description: t('features.immersive.description')
    },
    {
      icon: <Star className="w-12 h-12 text-blue-400" />,
      title: t('features.exclusive.title'),
      description: t('features.exclusive.description')
    },
    {
      icon: <Award className="w-12 h-12 text-purple-400" />,
      title: t('features.premium.title'),
      description: t('features.premium.description')
    }
  ];

  const testimonials = [
    {
      text: t('testimonials.0.text'),
      author: t('testimonials.0.author'),
      role: t('testimonials.0.role'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      text: t('testimonials.1.text'),
      author: t('testimonials.1.author'),
      role: t('testimonials.1.role'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  ];

  const partners = t('partners.list', { returnObjects: true }) as string[];

  interface FAQItem {
    question: string;
    answer: string;
  }
  const faqItems = t('faq.items', { returnObjects: true }) as FAQItem[];

  return (
    <div className="bg-black text-white">
      <ScrollToTopButton />
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/fallback-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 z-10" />
        
        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        >
          <source
            src="/src/assets/1739134367455340.mp4"
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
            src="/src/assets/1739134367455340.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-20 container mx-auto px-4 h-screen flex items-center">
          <div className="max-w-4xl">
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              {t('hero.title')}
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300">
              {t('hero.subtitle')}
            </p>
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="hero-cta bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-5 rounded-full text-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-3 group"
            >
              {t('hero.cta')}
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                {t('about.title')}
              </h2>
              <p className="text-xl text-gray-300">
                {t('about.description')}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              {t('features.title')}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 text-lg">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              {t('products.title')}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Section */}
      <ResponsiveSection />

      {/* Partners Section */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-900/20">
        <FadeInSection>
          <h3 className="text-center text-2xl font-semibold mb-8">
            {t('partners.title')}
          </h3>
        </FadeInSection>
        <Marquee gradient gradientColor="rgb(0, 0, 0)" speed={50}>
          <div className="flex items-center gap-16 py-4">
            {partners.map((partner: string, index: number) => (
              <div
                key={index}
                className="text-2xl font-bold text-gray-500 hover:text-purple-400 transition-colors duration-300"
              >
                {partner}
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              {t('testimonials.title')}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-xl">{testimonial.author}</p>
                      <p className="text-purple-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 mb-4">{testimonial.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              {t('faq.title')}
            </h2>
          </FadeInSection>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item: FAQItem, index: number) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">{item.question}</h3>
                  <p className="text-gray-400 text-lg">{item.answer}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-5 rounded-full text-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              {t('cta.button')}
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('footer.company')}</h3>
              <p className="text-gray-400 mb-6">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('footer.contacts.title')}</h4>
              <div className="space-y-4">
                <a href="tel:+7999999999" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                  +7 (999) 999-99-99
                </a>
                <a href="mailto:info@digital-theatre.ru" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                  info@digital-theatre.ru
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('footer.social.title')}</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-purple-900/20 text-center text-gray-500">
            © 2025 {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 