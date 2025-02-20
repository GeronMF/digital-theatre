import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const { t } = useTranslation();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.sendForm(
        'service_fdgdww7',
        'template_g74a4z9', // Ваш Template ID
        form.current,
        'YgMpsIG3l-K4fxLM8'
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          if (form.current) form.current.reset();
        }, 2000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg">
              <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-purple-500/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">{t('contact.title')}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form ref={form} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Предпочтительное время
                    </label>
                    <input
                      type="text"
                      name="preferred_time"
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Сообщение
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white resize-none"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm"
                    >
                      {t('contact.success')}
                    </motion.p>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {t('contact.error')}
                    </motion.p>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
                  >
                    {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                    <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactForm; 