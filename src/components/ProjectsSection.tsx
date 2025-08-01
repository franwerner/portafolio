import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import projects from '@/constant/projects.constant';


export default function ProjectsSection() {
  const { translate } = useLanguage()
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const scrollToPreview = () => {
    const previewElement = document.getElementById('projects-preview');
    if (previewElement) {
      previewElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  const nextProject = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setTimeout(() => {
      setIsAnimating(false)
      scrollToPreview()
    }, 300)
  }

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => {
      setIsAnimating(false);
      scrollToPreview();
    }, 300);
  };

  const goToProject = (index: number) => {
    if (isAnimating || index === currentProject) return;
    setIsAnimating(true);
    setCurrentProject(index);
    setTimeout(() => {
      setIsAnimating(false);
      scrollToPreview();
    }, 300);
  };

  const nextProjectAuto = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 300);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextProjectAuto();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section id="projects" className="section-padding py-16 md:py-24 lg:py-32">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            {translate.projects.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translate.projects.subtitle}
          </p>
        </div>

        <div className="relative mb-16">
          <div className={`glass-effect rounded-2xl overflow-hidden hover-lift transition-all duration-300 ${isAnimating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
            <div className="grid lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
              <div className="relative">
                <div className={`aspect-video bg-gradient-to-br ${projects[currentProject].color} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {projects[currentProject].category}
                  </div>

                  <div className="text-6xl font-bold text-white/80">
                    {projects[currentProject].title.charAt(0)}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <span className="text-white/70 text-sm font-bold">#{projects[currentProject].id}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToProject(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentProject
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-foreground">
                    {projects[currentProject].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg">
                    {projects[currentProject].description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Tecnologías:</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[currentProject].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  {projects[currentProject].liveUrl && (
                    <a
                      href={projects[currentProject].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 hover-lift font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {translate.projects.viewLive}
                    </a>
                  )}
                  {projects[currentProject].githubUrl && (
                    <a
                      href={projects[currentProject].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-lift font-medium"
                    >
                      <Github className="w-4 h-4" />
                      {translate.projects.viewCode}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevProject}
            disabled={isAnimating}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-background/90 border border-border rounded-full hover:bg-muted transition-all duration-300 hover-lift z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={translate.projects.prev}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextProject}
            disabled={isAnimating}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-background/90 border border-border rounded-full hover:bg-muted transition-all duration-300 hover-lift z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={translate.projects.next}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div id="projects-preview" className="relative overflow-hidden rounded-lg bg-muted/30 py-8">
          <div className="animate-marquee flex gap-6 whitespace-nowrap items-center justify-center">
            {projects.map((project, index) => (
              <button
                key={`first-${index}`}
                onClick={() => goToProject(index)}
                className={`flex-shrink-0 p-4 rounded-lg border transition-all duration-300 hover-lift flex flex-col items-center text-center ${index === currentProject
                  ? 'border-primary bg-primary/10 shadow-lg scale-105'
                  : 'border-border bg-background/50 hover:border-primary/50 hover:bg-primary/5'
                  }`}
              >
                <div className={`w-32 h-20 bg-gradient-to-br ${project.color} rounded mb-3 flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-xl font-bold text-white/80">
                    {project.title.charAt(0)}
                  </span>
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white/80 text-xs font-bold">{project.id}</span>
                  </div>
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-1">{project.title}</h4>
                <p className="text-xs text-primary font-medium">{project.category}</p>
              </button>
            ))}

            {projects.map((project, index) => (
              <button
                key={`second-${index}`}
                onClick={() => goToProject(index)}
                className={`flex-shrink-0 p-4 rounded-lg border transition-all duration-300 hover-lift flex flex-col items-center text-center ${index === currentProject
                  ? 'border-primary bg-primary/10 shadow-lg scale-105'
                  : 'border-border bg-background/50 hover:border-primary/50 hover:bg-primary/5'
                  }`}
              >
                <div className={`w-32 h-20 bg-gradient-to-br ${project.color} rounded mb-3 flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-xl font-bold text-white/80">
                    {project.title.charAt(0)}
                  </span>
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white/80 text-xs font-bold">{project.id}</span>
                  </div>
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-1">{project.title}</h4>
                <p className="text-xs text-primary font-medium">{project.category}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
