import { useState, useEffect, useCallback, memo } from "react";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import clsx from "clsx";

const NAV_ITEMS = [
  { key: "home", id: "home" },
  { key: "technologies", id: "technologies" },
  { key: "projects", id: "projects" },
  { key: "contact", id: "contact" },
];

const Logo = memo(() => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <img
        src="/logo2.png"
        className="h-[45px] w-max-min"
        alt="Logo"
      />
    </div>
  )
})

const NavLinks = memo(({
  scrollToSection,
  className,
}: {

  scrollToSection: (id: string) => void;
  className?: string;
}) => {
  const { translate } = useLanguage()
  return NAV_ITEMS.map((item) => (
    <li
      key={item.id}
      onClick={() => scrollToSection(item.id)}
      className={`${className} relative border-b-2 border-transparent hover:border-emerald-400 cursor-pointer text-foreground hover:text-emerald-500 transition duration-300 font-semibold px-3 py-1 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-emerald-400 before:transition-all before:duration-300 hover:before:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2`}
    >
      {translate.nav[item.key]}
    </li>
  ))
})

function Controls({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, language } = useLanguage()
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleLanguage}
        className="p-2 rounded-lg flex hover:bg-muted transition-colors duration-200"
        title="Toggle Language"
      >
        <Globe className="w-5 h-5" />
        <span className="ml-1 text-sm font-medium">{language.toUpperCase()}</span>
      </button>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
        title="Toggle Theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}

const NavMenu = memo(({
  scrollToSection
}: {
  scrollToSection: (id: string) => void;
}) => {
  return (
    <ul
      className={clsx(
        "md:hidden px-4 border-t backdrop-blur-[6px] bg-background/60 py-4 space-y-4",
        "animate-fade-in"
      )}
    >
      <NavLinks
        scrollToSection={scrollToSection}
        className={clsx(
          "block w-full px-4 py-3 text-left font-semibold rounded-lg",
          "border-2 border-transparent transition-all duration-300",
          "hover:border-emerald-500 border-2 hover:shadow-md",
        )}
      />
    </ul>
  )
})

export default function Navigation() {


  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    window.location.href = `#${sectionId}`
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full right-0 z-50",
        isScrolled && "border-b border-border/50 shadow-lg "
      )}
    >
      <div className="bg-background">
        <div className={clsx(
          "flex items-center container-custom justify-between h-16 px-4",
          isScrolled && " backdrop-blur-[6px] ",
        )}>
          <Logo />

          <ul className="hidden md:flex items-center space-x-8">
            <NavLinks scrollToSection={scrollToSection} />
          </ul>

          <Controls
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
      {isMobileMenuOpen && <NavMenu scrollToSection={scrollToSection} />}
    </nav>
  );
}
