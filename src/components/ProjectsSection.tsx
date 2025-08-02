import projects, { Project } from '@/constant/projects.constant';
import { useLanguage } from '@/contexts/LanguageContext';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { memo, useCallback, useEffect, useState } from 'react';

interface ProjectPreviewButtonProps {
  project: Project
  isActive: Boolean
  changeProject: (i: number) => void
  index: number
}


const ProjectPreviewButton = memo(({
  project,
  isActive,
  changeProject,
  index
}: ProjectPreviewButtonProps) => {
  return (
    <button
      onClick={() => changeProject(index)}
      className={clsx(
        "flex-shrink-0 p-4 mx-2  rounded-lg border transition-all duration-300 hover-lift flex flex-col items-center text-center",
        isActive
          ? "border-emerald-200 bg-emerald-100/30 shadow-lg scale-105"
          : "border-border bg-background/50 hover:border-emerald-200 hover:bg-emerald-100/30"
      )}
    >
      <div
        className={clsx(
          "w-32 h-20 bg-gradient-to-br rounded mb-3 flex items-center justify-center relative overflow-hidden",
          project.color
        )}
      >
        <span className="text-xl font-bold text-white/80">
          {project.title.charAt(0)}
        </span>
      </div>
      <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-1">
        {project.title}
      </h4>
      <p className="text-xs text-primary font-medium">{project.category}</p>
    </button>
  )
})

const ProjectInfo = ({ project, translate }) => (
  <div
    className="flex flex-col justify-center space-y-4 lg:space-y-6">
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-foreground">
        {project.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg">
        {project.description}
      </p>
    </div>

    <div>
      <h4 className="font-semibold mb-4 text-foreground">Tecnologías:</h4>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className={clsx(
              "px-3 py-[6px] bg-emerald-100 text-emerald-600 rounded-full",
              "text-xs font-semibold tracking-wide uppercase shadow-sm transition hover:bg-emerald-400",
              "hover:text-white  select-none"
            )}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 hover-lift font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          {translate.projects.viewLive}
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
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
);

const ProjectMainDisplay = ({ project }) => (
  <div
    className={clsx(
      "aspect-video rounded-lg flex items-center justify-center relative overflow-hidden",
      "bg-gradient-to-br",
      project.color
    )}
  >
    <div className="absolute top-4 left-4 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
      {project.category}
    </div>

    <div className="text-6xl font-bold text-white/80">
      {project.title.charAt(0)}
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
  </div>
);

const PaginationDots = ({ projects, currentProject, goToProject }) => (
  <div className="flex justify-center mt-6 gap-2">
    {projects.map((_, index) => (
      <button
        key={index}
        onClick={() => goToProject(index)}
        className={clsx(
          "h-2 rounded-full transition-all duration-300",
          index === currentProject
            ? "w-8 bg-primary"
            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
        )}
      />
    ))}
  </div>
)


const CarrouselButtons = memo(({
  prevProject,
  nextProject
}: {
  prevProject: () => void,
  nextProject: () => void,
}) => {
  const {
    translate
  } = useLanguage()
  return (
    <>
      <button
        onClick={prevProject}
        title={translate.projects.prev}
        className={clsx(
          "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-background/90 border border-emerald-200 rounded-full hover:bg-muted transition-all duration-300  z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextProject}
        title={translate.projects.next}
        className={clsx(
          "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-background/90 border border-emerald-200 rounded-full hover:bg-muted transition-all duration-300  z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </>
  )
})

const TitleSection = memo(() => {
  const {
    translate
  } = useLanguage()
  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl p-2 font-bold gradient-text mb-2">
        {translate.projects.title}
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {translate.projects.subtitle}
      </p>
    </div>
  )
})

const useProjectSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isStop, setStop] = useState(false)

  const changeProject = useCallback((index) => {
    if (isAnimating || index === currentProject) return;
    setIsAnimating(true);
    setCurrentProject(index);
    setTimeout(() => setIsAnimating(false), 300);
  }, [])

  const nextProject = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setTimeout(() => setIsAnimating(false), 300);
  }, [])

  const prevProject = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true);
    setCurrentProject((prev) => (prev - 1) < 0 ? projects.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 300);
  }, [])

  useEffect(() => {
    if (isStop) return
    const interval = setInterval(nextProject, 3000)
    return () => clearInterval(interval);
  }, [isAnimating, isStop])

  return {
    currentProject,
    changeProject,
    isAnimating,
    prevProject,
    nextProject,
    setStop
  }

}

export default function ProjectsSection() {

  const { translate } = useLanguage()
  const {
    changeProject,
    currentProject,
    isAnimating,
    nextProject,
    prevProject,
    setStop
  } = useProjectSection()

  const current = projects[currentProject];

  return (
    <section id="projects" className="section-padding py-16 md:py-24 lg:py-32">
      <div className="container-custom">
        <TitleSection />
        <div
          onMouseEnter={() => setStop(true)}
          onMouseLeave={() => setStop(false)}
          className="relative mb-16">
          <div
            className={clsx(
              "glass-effect hover:border-emerald-200 border-2  rounded-2xl   overflow-hidden hover-lift transition-all duration-300",
              isAnimating ? "scale-[0.98] opacity-80" : "scale-100 opacity-100"
            )}>
            <div
              className="grid lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8">
              <div className="relative">
                <ProjectMainDisplay project={current} />
                <PaginationDots
                  projects={projects}
                  currentProject={currentProject}
                  goToProject={changeProject}
                />
              </div>
              <ProjectInfo
                project={current}
                translate={translate} />
            </div>
          </div>

          <CarrouselButtons
            nextProject={nextProject}
            prevProject={prevProject}
          />
        </div>
        <div className="w-full relative  whitespace-nowrap overflow-hidden bg-muted/50 shadow-lg border p-4 rounded-lg">
          <div className="animate-infinite-scroll  inline-flex ">
            {projects.map((project, index) => (
              <ProjectPreviewButton
                key={index}
                project={project}
                index={index}
                isActive={index === currentProject}
                changeProject={changeProject}
              />
            ))}
          </div>
          <div className="animate-infinite-scroll  inline-flex  ">
            {projects.map((project, index) => (
              <ProjectPreviewButton
                key={index}
                project={project}
                isActive={index === currentProject}
                index={index}
                changeProject={changeProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}