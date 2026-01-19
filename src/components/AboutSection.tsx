import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const techTags = [
  { name: 'Python', hsl: '199, 89%, 48%' },
  { name: 'TensorFlow', hsl: '270, 80%, 60%' },
  { name: 'PyTorch', hsl: '330, 85%, 60%' },
  { name: 'LangChain', hsl: '160, 84%, 45%' },
  { name: 'OpenAI', hsl: '199, 89%, 48%' },
  { name: 'Hugging Face', hsl: '270, 80%, 60%' },
  { name: 'Data Analysis', hsl: '330, 85%, 60%' },
  { name: 'Computer Vision', hsl: '160, 84%, 45%' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      
      {/* Gradient orb with purple */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsla(270, 80%, 60%, 0.1) 0%, transparent 70%)' }}
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

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'linear-gradient(135deg, hsla(330, 85%, 60%, 0.2), hsla(270, 80%, 60%, 0.1))',
              border: '1px solid hsla(330, 85%, 60%, 0.3)',
              color: 'hsl(330, 85%, 70%)'
            }}
          >
            About
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(270, 80%, 70%), hsl(330, 85%, 60%))' }}
            >
              The Vision
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 leading-relaxed"
        >
          Resultyst is a personal lab for exploring the frontiers of artificial intelligence 
          and data science. Here, ideas are tested, models are trained, and innovations are 
          documented for the community to learn and build upon.
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