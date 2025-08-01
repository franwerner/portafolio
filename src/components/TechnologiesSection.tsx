import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { backendTech, devOpsTech, frontendTech, languagesTech, Technology } from '@/constant/tecnologies.constant';

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
  return (
    <div className="glass-effect p-4 rounded-xl group emerald-border hover:emerald-glow transform transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-center mb-4">
        <Icon />
      </div>
      <h3
        className="text-lg font-semibold text-center mb-2" >
        {name}
      </h3>
      <div className="flex justify-center">
        <StarRating level={level} />
      </div>
    </div>
  );
};

export default function TechnologiesSection() {
  const { translate } = useLanguage()


  return (
    <section id="technologies" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl p-2 font-bold gradient-text mb-2">
            {translate.tech.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translate.tech.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8 text-primary">
              {translate.tech.language}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {languagesTech.map((tech, index) => (
                <TechCard key={index} {...tech} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8 text-primary">
              Frontend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {frontendTech.map((tech, index) => (
                <TechCard key={index} {...tech} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8 text-primary">
              Backend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {backendTech.map((tech, index) => (
                <TechCard key={index} {...tech} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8 text-primary">
              DevOps
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {devOpsTech.map((tech, index) => (
                <TechCard key={index} {...tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
