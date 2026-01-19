import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background elements with multi-color */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Purple gradient orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsla(270, 80%, 60%, 0.15) 0%, transparent 70%)' }}
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
        {/* Pink gradient orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsla(330, 85%, 60%, 0.12) 0%, transparent 70%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Cyan gradient orb */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.1) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          style={{ 
            background: 'linear-gradient(135deg, hsla(270, 80%, 60%, 0.2), hsla(330, 85%, 60%, 0.1))',
            border: '1px solid hsla(270, 80%, 60%, 0.3)'
          }}
        >
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(330, 85%, 60%)' }} />
          <span className="text-sm text-muted-foreground">AI Experiments & Innovations</span>
        </motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span 
            className="bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(270, 80%, 60%) 50%, hsl(330, 85%, 60%) 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 6s ease infinite'
            }}
          >
            Resultyst
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-4"
        >
          Where <span style={{ color: 'hsl(199, 89%, 60%)' }}>data</span> meets{' '}
          <span style={{ color: 'hsl(270, 80%, 70%)' }}>intelligence</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-muted-foreground/70 mb-12 max-w-2xl mx-auto"
        >
          Exploring the frontiers of AI, automation, and data science through hands-on experiments and research
        </motion.p>

        {/* Animated icons row with distinct colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-8 mb-12"
        >
          {/* Brain - Purple */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 rounded-xl glass"
            style={{ 
              boxShadow: '0 0 30px hsla(270, 80%, 60%, 0.3)',
              border: '1px solid hsla(270, 80%, 60%, 0.3)'
            }}
          >
            <Brain className="w-8 h-8" style={{ color: 'hsl(270, 80%, 70%)' }} />
          </motion.div>
          
          {/* Sparkles - Pink */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="p-4 rounded-xl glass"
            style={{ 
              boxShadow: '0 0 30px hsla(330, 85%, 60%, 0.3)',
              border: '1px solid hsla(330, 85%, 60%, 0.3)'
            }}
          >
            <Sparkles className="w-8 h-8" style={{ color: 'hsl(330, 85%, 70%)' }} />
          </motion.div>
          
          {/* Zap - Cyan */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="p-4 rounded-xl glass"
            style={{ 
              boxShadow: '0 0 30px hsla(199, 89%, 48%, 0.3)',
              border: '1px solid hsla(199, 89%, 48%, 0.3)'
            }}
          >
            <Zap className="w-8 h-8" style={{ color: 'hsl(199, 89%, 60%)' }} />
          </motion.div>
        </motion.div>

        {/* CTA Button with gradient */}
        <motion.a
          href="#experiments"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, hsl(199, 89%, 48%), hsl(270, 80%, 60%))',
            boxShadow: '0 0 30px hsla(199, 89%, 48%, 0.4), 0 0 60px hsla(270, 80%, 60%, 0.2)'
          }}
          whileHover={{ 
            boxShadow: '0 0 40px hsla(199, 89%, 48%, 0.6), 0 0 80px hsla(270, 80%, 60%, 0.4)'
          }}
        >
          Explore the Lab
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full mt-2"
            style={{ background: 'linear-gradient(to bottom, hsl(199, 89%, 48%), hsl(270, 80%, 60%))' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
