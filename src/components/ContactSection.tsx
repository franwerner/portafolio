import React, { useEffect, useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import clsx from 'clsx';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const useForm = () => {
  const { translate } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    const trimmed = value.trim();

    if (!trimmed) return translate.validation.required;

    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return translate.validation.email;
      }
    }

    if (name === 'message' == trimmed.length < 10) {
      return translate.validation.minLength.replace('{min}', '10');
    }


    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {} as FormErrors;

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Solo volver a validar si cambia el idioma (por ejemplo, si cambian los mensajes)
    if (Object.keys(errors).length > 0) {
      validateForm();
    }
  }, [translate]);

  return {
    handleInputChange,
    handleSubmit,
    errors,
    formData,
    isSubmitting,
    submitStatus,
  };
};

export default function ContactSection() {
  const { translate } = useLanguage()

  const {
    errors,
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    submitStatus
  } = useForm()



  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text p-2 mb-2">
            {translate.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translate.contact.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-effect border-2 border-muted p-8 rounded-2xl space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {translate.contact.name}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={clsx(
                    "w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2",
                    " transition-colors border-border ",
                    errors.name && "border-destructive focus:ring-destructive",
                    !errors.name && "focus:ring-emerald-400 hover:border-emerald-500"
                  )}
                  placeholder={translate.contact.name}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {translate.contact.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={clsx(
                    "w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2",
                    " transition-colors border-border ",
                    errors.email && "border-destructive focus:ring-destructive",
                    !errors.email && "focus:ring-emerald-400 hover:border-emerald-500"
                  )}
                  placeholder={translate.contact.email}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {translate.contact.message}
              </label>
              <div className="relative h-[200px]">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}

                  maxLength={300}
                  className={clsx(
                    "w-full pl-10 resize-none pr-4 py-3 pb-7 bg-background border rounded-lg focus:outline-none focus:ring-2",
                    "transition-colors border-border",
                    errors.message && "border-destructive focus:ring-destructive",
                    !errors.message && "focus:ring-emerald-400 hover:border-emerald-500"
                  )}
                  placeholder={translate.contact.message}
                />
                <div className="absolute bottom-1.5 right-3 text-xs text-muted-foreground">
                  {formData.message.trim().length}/300
                </div>
              </div>
              {errors.message && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {translate.contact.sending}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {translate.contact.send}
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                <span>{translate.contact.success}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span>{translate.contact.error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
