import links from '@/constant/links.constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Globe, Instagram, Linkedin, Mail } from 'lucide-react';
import React from 'react';

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

const navLinks = [
  { key: "home", id: "home" },
  { key: "technologies", id: "technologies" },
  { key: "projects", id: "projects" },
  { key: "contact", id: "contact" }
]

const techStack = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
];


const BrandInfo = () => {
  const { translate, language, toggleLanguage } = useLanguage()

  return (
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
          {language === "es" ? "Español" : "English"}
        </span>
      </button>
    </div>
  )
}

const SocialLinks = () => {
  const { translate } = useLanguage()

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">{translate.footer.contact}</h4>
      <div className="flex flex-wrap gap-4">
        {socialLinks.map(({ name, url, icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-muted hover:bg-primary rounded-lg transition-all duration-300 hover-lift"
            title={name}
          >
            <div className="text-muted-foreground group-hover:text-primary-foreground transition-colors">
              {icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const NavigationLinks = () => {
  const { translate } = useLanguage()

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">{translate.footer.links}</h4>
      <div className="space-y-2">
        {navLinks.map(({ key, id }) => (
          <button
            key={id}
            onClick={() => {
              window.location.href = `#${key}`
            }}
            className="block text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {translate.nav[key]}
          </button>
        ))}
      </div>
    </div>
  )
}

const Copyright = () => {
  const { translate } = useLanguage()

  return (
    <div className="border-t border-border py-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <span>© 2025 {translate.hero.name}.</span>
          <span>{translate.footer.rights}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <span>{translate.footer.built}</span>
          <div className="flex items-center gap-2">
            {techStack.map((tech, index) => (
              <div key={index} className='inline-flex  gap-1'>
                <span className="text-primary font-medium">{tech}</span>
                {index < techStack.length - 1 && <span className="text-muted-foreground">•</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-background border-t relative z-10 border-border">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BrandInfo />
            <SocialLinks />
            <NavigationLinks />
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  )
}
