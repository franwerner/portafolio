import { Download, Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { translate } = useLanguage();

  const handleDownloadCV = () => {
    console.log('Downloading CV...');
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground animate-fade-in-up">
                {translate.hero.greeting}
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold gradient-text animate-fade-in-up">
                {translate.hero.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground animate-fade-in-up">
                {translate.hero.title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl animate-fade-in-up">
              {translate.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
              <button
                onClick={handleDownloadCV}
                className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover-lift"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                {translate.hero.downloadCV}
              </button>

              <button
                onClick={scrollToContact}
                className="border border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover-lift"
              >
                <Mail className="w-5 h-5" />
                {translate.hero.contactMe}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 pt-8 animate-fade-in-up">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg hover:bg-muted transition-colors duration-300 hover-lift"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg hover:bg-muted transition-colors duration-300 hover-lift"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Avatar/Image */}
          <div className="flex-shrink-0 animate-fade-in-up">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/20 to-emerald-400/20 flex items-center justify-center animate-float">
                <div className="w-72 h-72 lg:w-88 lg:h-88 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
                  <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-background flex items-center justify-center">
                    {/* Avatar placeholder - in a real app, this would be an image */}
                    <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-primary/30 to-emerald-400/30 flex items-center justify-center">
                      <span className="text-4xl lg:text-6xl font-bold text-primary">FW</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse-dot emerald-glow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400 rounded-full animate-pulse-dot emerald-glow"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-emerald-300 rounded-full animate-pulse-dot emerald-glow"></div>
              <div className="absolute top-1/4 -right-12 w-3 h-3 bg-green-400 rounded-full animate-pulse-dot"></div>
              <div className="absolute bottom-1/3 -left-6 w-2 h-2 bg-emerald-500 rounded-full animate-pulse-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
