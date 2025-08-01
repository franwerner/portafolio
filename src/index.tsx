import AnimatedBackground from '@/components/AnimatedBackground';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import ProjectsSection from '@/components/ProjectsSection';
import ScrollToTopRocket from '@/components/ScrollToTopRocket';
import TechnologiesSection from '@/components/TechnologiesSection';

export default function Index() {

  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="relative z-10">
        <AnimatedBackground />
        <HeroSection />
        <TechnologiesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopRocket />
    </div>
  );
}
