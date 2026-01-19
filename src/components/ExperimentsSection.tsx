import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Database, Bot, Sparkles } from 'lucide-react';

const experiments = [
  {
    icon: Brain,
    title: 'AI Tools & Models',
    description: 'Exploring cutting-edge language models, computer vision, and neural network architectures.',
    color: 'cyan',
    hsl: '199, 89%, 48%'
  },
  {
    icon: Database,
    title: 'Data Science Research',
    description: 'Deep diving into analytics, visualization techniques, and predictive modeling.',
    color: 'purple',
    hsl: '270, 80%, 60%'
  },
  {
    icon: Bot,
    title: 'Automation Systems',
    description: 'Building intelligent automation pipelines and RPA solutions for real-world problems.',
    color: 'pink',
    hsl: '330, 85%, 60%'
  },
  {
    icon: Sparkles,
    title: 'Creative AI',
    description: 'Experimenting with generative AI, creative coding, and innovative applications.',
    color: 'green',
    hsl: '160, 84%, 45%'
  }
];

interface ExperimentCardProps {
  icon: typeof Brain;
  title: string;
  description: string;
  color: string;
  hsl: string;
  index: number;
}

const ExperimentCard = ({ icon: Icon, title, description, color, hsl, index }: ExperimentCardProps) => {
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
        className="relative p-8 rounded-2xl glass overflow-hidden h-full"
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
          className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, hsla(${hsl}, 0.2), hsla(${hsl}, 0.05))`,
            border: `1px solid hsla(${hsl}, 0.3)`,
            boxShadow: `0 0 20px hsla(${hsl}, 0.2)`
          }}
          whileHover={{
            boxShadow: `0 0 40px hsla(${hsl}, 0.4)`,
            scale: 1.1
          }}
        >
          <Icon className="w-8 h-8" style={{ color: `hsl(${hsl})` }} />
        </motion.div>

        {/* Title */}
        <h3 
          className="text-xl font-bold mb-3 transition-colors duration-300"
          style={{ color: `hsl(${hsl})` }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Corner accent */}
        <motion.div
          className="absolute bottom-0 right-0 w-20 h-20 opacity-20"
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
    <section id="experiments" className="relative py-32 px-4">
      {/* Section header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span 
          className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
          style={{
            background: 'linear-gradient(135deg, hsla(270, 80%, 60%, 0.2), hsla(330, 85%, 60%, 0.1))',
            border: '1px solid hsla(270, 80%, 60%, 0.3)',
            color: 'hsl(270, 80%, 70%)'
          }}
        >
          Research Areas
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span 
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, hsl(199, 89%, 60%), hsl(270, 80%, 70%))' }}
          >
            The Lab
          </span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Exploring the intersection of artificial intelligence, data science, and creative technology
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {experiments.map((experiment, index) => (
          <ExperimentCard key={experiment.title} {...experiment} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ExperimentsSection;