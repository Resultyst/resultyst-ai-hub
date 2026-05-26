import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Database, Bot, Sparkles } from 'lucide-react';

const experiments = [
  {
    icon: Brain,
    title: 'AI Tools & Models',
    description: 'Exploring powerful AI tools, LLMs, open-source models and next-generation AI workflows',
    color: 'orange',
    hsl: '28, 95%, 55%',
    url: 'https://www.youtube.com/@Resultyst'
  },
  {
    icon: Database,
    title: 'Data Science Research',
    description: 'Exploring analytics, visualization, predictive systems and real-world data intelligence',
    color: 'navy',
    hsl: '215, 90%, 55%',
    url: 'https://www.youtube.com/@Resultyst'
  },
  {
    icon: Bot,
    title: 'Automation Systems',
    description: 'Building AI-powered workflows, automations and systems that simplify real-world tasks',
    color: 'navy',
    hsl: '215, 90%, 55%',
    url: 'https://www.youtube.com/@Resultyst'
  },
  {
    icon: Sparkles,
    title: 'Creative AI',
    description: 'Exploring content creation and creative workflows that can augment our intelligence through the use of artificial intelligence',
    color: 'orange',
    hsl: '28, 95%, 55%',
    url: 'https://www.youtube.com/@Resultyst'
  }
];

interface ExperimentCardProps {
  icon: typeof Brain;
  title: string;
  description: string;
  color: string;
  hsl: string;
  url: string;
  index: number;
}

const ExperimentCard = ({ icon: Icon, title, description, color, hsl, url, index }: ExperimentCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <motion.div
        className="relative p-4 sm:p-5 rounded-2xl glass overflow-hidden h-full"
        style={{
          border: `1px solid hsla(${hsl}, 0.2)`,
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        {/* Colored glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, hsla(${hsl}, 0.15) 0%, transparent 70%)`
          }}
        />

        {/* Animated accent line */}
        <motion.div
          className="absolute top-0 left-0 h-1 rounded-t-2xl"
          style={{ background: `hsl(${hsl})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        />

        {/* Icon with color */}
        <motion.div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{
            background: `linear-gradient(135deg, hsla(${hsl}, 0.2), hsla(${hsl}, 0.05))`,
            border: `1px solid hsla(${hsl}, 0.3)`,
            boxShadow: `0 0 15px hsla(${hsl}, 0.15)`
          }}
          whileHover={{
            boxShadow: `0 0 30px hsla(${hsl}, 0.35)`,
            scale: 1.1
          }}
        >
          <Icon className="w-6 h-6" style={{ color: `hsl(${hsl})` }} />
        </motion.div>

        {/* Title */}
        <h3 
          className="text-base sm:text-lg font-bold mb-1.5 transition-colors duration-300"
          style={{ color: `hsl(${hsl})` }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-0">
          {description}
        </p>

        {/* Corner accent */}
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16 opacity-15"
          style={{
            background: `radial-gradient(circle at bottom right, hsla(${hsl}, 0.5), transparent 70%)`
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ExperimentsSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="experiments" className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden px-6 py-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 w-full max-w-2xl"
        >
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'linear-gradient(135deg, hsla(28, 95%, 55%, 0.2), hsla(215, 90%, 55%, 0.1))',
              border: '1px solid hsla(28, 95%, 55%, 0.3)',
              color: 'hsl(28, 95%, 70%)'
            }}
          >
            AI Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 60%), hsl(215, 90%, 60%))' }}
            >
              The AI Hub
            </span>
          </h2>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Discovering the fast-moving world of AI through tools, experiments, hackathons and community-driven innovation
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {experiments.map((experiment, index) => (
            <ExperimentCard key={experiment.title} {...experiment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;