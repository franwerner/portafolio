import links from '@/constant/links.constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Globe, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';

export default function Footer() {
  const { translate, language, toggleLanguage } = useLanguage();

  const socialLinks = [
    {
      name: 'GitHub',
      url: links.github,
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: links.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: 'Instagram',
      url: links.instagram,
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: 'Email',
      url: `mailto:${links.gmail}`,
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  const techStack = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Vite',
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold gradient-text">
                {translate.hero.name}
              </h3>
              <p className="text-muted-foreground">
                {translate.hero.title} - {translate.hero.description}
              </p>

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
              >
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  {language === 'es' ? 'Español' : 'English'}
                </span>
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{translate.footer["contact"]}</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-muted hover:bg-primary rounded-lg transition-all duration-300 hover-lift"
                    title={link.name}
                  >
                    <div className="text-muted-foreground group-hover:text-primary-foreground transition-colors">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{translate.footer["links"]}</h4>
              <div className="space-y-2">
                {[
                  { key: 'home', id: 'home' },
                  { key: 'technologies', id: 'technologies' },
                  { key: 'projects', id: 'projects' },
                  { key: 'contact', id: 'contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      window.location.href = `#${item.key}`
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {translate.nav[item.key]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span>© 2025 {translate.hero.name}.</span>
              <span>{translate.footer.rights}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span>{translate.footer.built}</span>
              <div className="flex items-center gap-2 ">
                {techStack.map((tech, index) => (
                  <React.Fragment key={tech}>
                    <span className="text-primary font-medium">{tech}</span>
                    {index < techStack.length - 1 && (
                      <span className="text-muted-foreground">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
