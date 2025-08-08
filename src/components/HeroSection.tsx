import links from '@/constant/links.constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const TypingEffect = () => {
  const { translate } = useLanguage()
  const text = translate.hero.name;
  const [displayedText, setDisplayedText] = useState(text.charAt(0));

  useEffect(() => {
    let reverse = false
    const timer = setInterval(() => {
      setDisplayedText(prev => {
        if (reverse) {
          const nextText = prev.slice(0, -1);
          reverse = nextText.length > 1;
          return nextText;
        } else {
          const nextText = prev + text.charAt(prev.length)

          reverse = nextText.length === text.length

          return nextText;
        }
      })
    }, 150);

    return () => clearInterval(timer)
  }, [])

  return (
    <h1 className="text-5xl select-none  lg:text-7xl font-bold gradient-text">
      {displayedText}
    </h1>
  );
};


function Contacts() {
  return (
    <div className="flex justify-center lg:justify-start gap-4 pt-8 animate-fade-in-up">
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-lg border hover:bg-muted  hover-lift transform transition-transform duration-300 ease-in-out"
        title="GitHub"
      >
        <Github className="w-6 h-6" />
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-lg border hover:bg-muted  hover-lift transform transition-transform duration-300 ease-in-out"
        title="LinkedIn"
      >
        <Linkedin className="w-6 h-6" />
      </a>
    </div>
  );
}

function HeroActions() {
  const { translate } = useLanguage()
  const scrollToContact = () => (window.location.href = "#contact");
  const handleDownloadCV = () => {
    console.log("Downloading CV...");
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
      <a className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover-lift" href='/cv.docx' download>
        <Download className="w-5 h-5 group-hover:animate-bounce" />
        {translate.hero.downloadCV}
      </a>
      <button
        onClick={scrollToContact}
        className="border border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover-lift"
      >
        <Mail className="w-5 h-5" />
        {translate.hero.contactMe}
      </button>
    </div>
  )
}


function HeroTextSection() {
  const { translate } = useLanguage()


  return (
    <div className="flex-1 text-center lg:text-left space-y-8">
      <div className="space-y-4">
        <p className="text-xl text-muted-foreground animate-fade-in-up">
          {translate.hero.greeting}
        </p>
        <TypingEffect />
        <h2 className="text-2xl lg:text-3xl font-semibold text-foreground animate-fade-in-up">
          {translate.hero.title}
        </h2>
      </div>

      <p className="text-lg text-muted-foreground max-w-2xl animate-fade-in-up">
        {translate.hero.description}
      </p>
      <HeroActions />
      <Contacts />
    </div>
  );
}

function HeroImageSection() {
  return (
    <div className="relative mx-auto max-w-[12rem] aspect-square">
      <div className="w-full h-full rounded-full mt-2 flex items-center justify-center ">
        <img src="/logo2.png" className="h-auto w-auto max-h-full max-w-full" alt="Logo" />
      </div>
      <div className="absolute -top-5 -right-5 w-8 h-8 bg-emerald-500 rounded-full" />
      <div className="absolute -bottom-5 -left-5 w-6 h-6 bg-emerald-300 rounded-full" />
      <div className="absolute top-1/2 -left-8 w-4 h-4 bg-emerald-400 rounded-full" />
      <div className="absolute top-1/4 -right-12 w-3 h-3 bg-emerald-600 rounded-full" />
      <div className="absolute bottom-1/3 -left-6 w-2 h-2 bg-emerald-700 rounded-full" />
    </div>
  );
}

export default function HeroSection() {


  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <HeroTextSection />
          <HeroImageSection />
        </div>
      </div>
    </section>
  );
}