import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 gradient-border relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 circuit-pattern opacity-30" />
          
          {/* Animated gradient orb */}
          <motion.div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/20 text-primary"
            >
              About the Lab
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Where <span className="gradient-text">AI meets curiosity</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                I'm a GenAI enthusiast with hands-on experience in RPA and automation, 
                exploring the frontier of artificial intelligence and data science.
              </p>
              <p>
                <span className="text-primary font-medium">Resultyst</span> is my experimental space — 
                a lab for ideas, systems, and future-first intelligence. Here, I break down 
                complex AI concepts, curate cutting-edge tools, and share insights from the 
                ever-evolving world of technology.
              </p>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {['GenAI', 'RPA', 'Automation', 'Data Science', 'AI Research'].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-muted/50 text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
