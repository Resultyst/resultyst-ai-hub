import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const techTags = [
  { name: 'Python', hsl: '28, 95%, 55%' },
  { name: 'LangChain', hsl: '215, 90%, 55%' },
  { name: 'LangGraph', hsl: '45, 93%, 58%' },
  { name: 'CrewAI', hsl: '215, 60%, 45%' },
  { name: 'UiPath', hsl: '28, 95%, 55%' },
  { name: 'Blue Prism', hsl: '215, 90%, 55%' },
  { name: 'OpenAI', hsl: '45, 93%, 58%' },
  { name: 'Hugging Face', hsl: '215, 60%, 45%' },
  { name: 'TensorFlow', hsl: '28, 95%, 55%' },
  { name: 'Data Analysis', hsl: '215, 90%, 55%' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative h-full w-full flex items-center justify-center overflow-hidden px-4 py-8">
      {/* Background pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      
      {/* Gradient orb with purple */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsla(215, 90%, 55%, 0.1) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'linear-gradient(135deg, hsla(28, 95%, 55%, 0.2), hsla(215, 90%, 55%, 0.1))',
              border: '1px solid hsla(28, 95%, 55%, 0.3)',
              color: 'hsl(28, 95%, 70%)'
            }}
          >
            About
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 60%), hsl(215, 90%, 60%))' }}
            >
              The Vision
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-white text-center mb-8 sm:mb-12 leading-relaxed px-2"
        >
          Resultyst is a personal AI Ecosystem exploring the rapidly evolving world of Artificial Intelligence, GenAI, Automation and emerging technology<br /><br />
          From Tools & Experiments to Hackathons, Insights and AI breakthroughs - the goal is to simplify, document and share innovation with the community
        </motion.p>

        {/* Tech tags with varied colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techTags.map((tag, index) => (
            <motion.span
              key={tag.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, hsla(${tag.hsl}, 0.15), hsla(${tag.hsl}, 0.05))`,
                border: `1px solid hsla(${tag.hsl}, 0.3)`,
                color: `hsl(${tag.hsl})`,
                boxShadow: `0 0 15px hsla(${tag.hsl}, 0.1)`
              }}
              whileHover={{
                boxShadow: `0 0 25px hsla(${tag.hsl}, 0.3)`
              }}
            >
              {tag.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;