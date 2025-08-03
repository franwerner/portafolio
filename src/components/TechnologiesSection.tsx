import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { backendTech, databaseTech, devOpsTech, frontendTech, languagesTech, Technology } from '@/constant/tecnologies.constant';
import { useOnScreen } from '@/hooks/useOnScren.hook';

const StarRating = ({ level }: { level: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= level
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-muted-foreground'
            }`}
        />
      ))}
    </div>
  );
};

const TechCard = ({
  Icon,
  level,
  name,
}: Technology) => {

  const { ref, isVisible } = useOnScreen<HTMLDivElement>({
    threshold: 0,
  })
  return (
    <div
      ref={ref}
      className="bg-background/80 min-h-[100px] p-2 py-4 hover:scale-105 scale:95 rounded-xl group emerald-border hover:emerald-glow transform transition-transform duration-300 hover:-translate-y-1">
      <div className={!isVisible ? "hidden" : ""}>
        <div className="flex items-center justify-center mb-4">
          <Icon width={58} height={58} />
        </div>
        <h3
          className="text-lg font-semibold text-center mb-2" >
          {name}
        </h3>
        <div className="flex justify-center">
          <StarRating level={level} />
        </div>
      </div>
    </div>
  );
};

export default function TechnologiesSection() {
  const { translate } = useLanguage()

  const techSections = [
    { title: translate.tech.language, techs: languagesTech },
    { title: "Frontend", techs: frontendTech },
    { title: "Backend", techs: backendTech },
    { title: "Database", techs: databaseTech },
    { title: "DevOps", techs: devOpsTech },
  ]

  return (
    <section id="technologies" className="section-padding  bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl p-2 font-bold gradient-text mb-2">
            {translate.tech.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translate.tech.subtitle}
          </p>
        </div>

        <div className="space-y-16 max-w-3xl mx-auto">
          {techSections.map(({ title, techs }, index) => (
            <div key={index}>
              <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
                {title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {techs.map((tech, i) => (
                  <TechCard key={i} {...tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}