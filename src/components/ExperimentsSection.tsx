import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, FlaskConical, Newspaper, Bot, Lightbulb, Code } from 'lucide-react';

const experiments = [
  {
    icon: Bot,
    title: 'AI Tools Curation',
    description: 'Handpicked collection of cutting-edge AI tools, tested and reviewed for real-world use.',
    color: 'primary',
  },
  {
    icon: FlaskConical,
    title: 'Research Breakdowns',
    description: 'Complex research papers simplified into digestible insights for the curious mind.',
    color: 'secondary',
  },
  {
    icon: Cpu,
    title: 'Automation Systems',
    description: 'Building intelligent workflows that bridge the gap between ideas and execution.',
    color: 'accent',
  },
];

const ExperimentCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  index 
}: { 
  icon: typeof Bot; 
  title: string; 
  description: string; 
  color: string; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative glass rounded-2xl p-8 gradient-border overflow-hidden cursor-pointer transition-all duration-500`}
    >
      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 bg-${color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      
      {/* Circuit pattern on hover */}
      <div className="absolute inset-0 circuit-pattern opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      {/* Animated corner accents */}
      <div className={`absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-${color}/0 group-hover:border-${color}/50 rounded-tl-2xl transition-all duration-500`} />
      <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-${color}/0 group-hover:border-${color}/50 rounded-br-2xl transition-all duration-500`} />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-${color}/20 group-hover:bg-${color}/30 transition-colors duration-300`}
        >
          <Icon className={`w-7 h-7 text-${color}`} />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Explore link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 mt-6 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <span>Explore</span>
          <span>→</span>
        </motion.div>
      </div>

      {/* Floating particles on hover */}
      <motion.div
        className={`absolute top-1/2 right-8 w-2 h-2 rounded-full bg-${color}/50`}
        animate={{
          y: [-20, 20, -20],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className={`absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full bg-${color}/40`}
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </motion.div>
  );
};

const ExperimentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experiments" ref={ref} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-secondary/20 text-secondary">
            Current Focus
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experiments</span> in Progress
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring the intersection of artificial intelligence, automation, and human creativity.
          </p>
        </motion.div>

        {/* Experiment cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiments.map((experiment, index) => (
            <ExperimentCard key={experiment.title} {...experiment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
