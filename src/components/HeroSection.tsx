import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  const signatureText = "— Built & Curated by Suryaa Narayanan K";
  const [displayText, setDisplayText] = useState("");
  const [remainingText, setRemainingText] = useState(signatureText);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;
    let initialTimeout: NodeJS.Timeout;

    const startTyping = () => {
      let index = 0;
      setDisplayText("");
      setRemainingText(signatureText);
      setIsTypingComplete(false);

      typingInterval = setInterval(() => {
        index++;
        setDisplayText(signatureText.slice(0, index));
        setRemainingText(signatureText.slice(index));

        if (index >= signatureText.length) {
          clearInterval(typingInterval);
          setIsTypingComplete(true);

          // Wait 3 seconds, then start typing again
          loopTimeout = setTimeout(() => {
            startTyping();
          }, 3000);
        }
      }, 60); // 60ms per character
    };

    // Initial delay before first typing starts
    initialTimeout = setTimeout(() => {
      startTyping();
    }, 1200);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(typingInterval);
      clearTimeout(loopTimeout);
    };
  }, []);

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden px-4 pt-20 md:pt-0">
      {/* Animated background elements with multi-color */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orange gradient orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsla(28, 95%, 55%, 0.15) 0%, transparent 70%)' }}
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
        {/* Navy gradient orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsla(215, 90%, 55%, 0.12) 0%, transparent 70%)' }}
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
        {/* Amber gradient orb */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsla(45, 93%, 58%, 0.1) 0%, transparent 70%)' }}
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
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Animated badge wrapped in a block to force vertical stacking */}
        <div className="block mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
            style={{ 
              background: 'linear-gradient(135deg, hsla(28, 95%, 55%, 0.2), hsla(215, 90%, 55%, 0.1))',
              border: '1px solid hsla(28, 95%, 55%, 0.3)'
            }}
          >
            
            <span className="text-sm text-muted-foreground">AI Exploration, Experimentation & Innovation</span>
          </motion.div>
        </div>

        {/* Main heading with gradient and absolute right-aligned curator signature */}
        <div className="relative mb-8 md:mb-12">
          <div className="inline-block relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold"
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 55%) 0%, hsl(45, 93%, 58%) 50%, hsl(215, 90%, 55%) 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 6s ease infinite'
                }}
              >
                Resultyst
              </span>
            </motion.h1>
          </div>

          {/* Curator Signature container — fixed width, right-aligned, fades in cleanly */}
          <div className="max-w-2xl mx-auto px-2 relative h-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute right-2 top-1 md:top-2 text-right text-xs sm:text-sm md:text-base font-semibold text-slate-300 tracking-wide font-mono whitespace-nowrap"
            >
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle"
                style={{ 
                  backgroundColor: 'hsl(28, 95%, 55%)',
                  visibility: isTypingComplete ? 'hidden' : 'visible'
                }}
              />
              <span className="opacity-0">{remainingText}</span>
            </motion.div>
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white mb-3 md:mb-4"
        >
          Where <span style={{ color: 'hsl(28, 95%, 60%)' }}>data</span> meets{' '}
          <span style={{ color: 'hsl(215, 90%, 70%)' }}>intelligence</span>
        </motion.p>

         <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg text-white mb-8 md:mb-12 max-w-2xl mx-auto px-2"
         >
          Exploring the frontiers of AI, Automation, and Data science through hands-on experiments and research
         </motion.p>

        {/* Animated icons row with distinct colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4 sm:gap-8 mb-8 md:mb-12"
        >
          {/* Brain - Orange */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 sm:p-4 rounded-xl glass"
            style={{ 
              boxShadow: '0 0 30px hsla(28, 95%, 55%, 0.3)',
              border: '1px solid hsla(28, 95%, 55%, 0.3)'
            }}
          >
            <Brain className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'hsl(28, 95%, 70%)' }} />
          </motion.div>
          
          {/* Sparkles - Gold */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="p-3 sm:p-4 rounded-xl glass"
            style={{ 
              boxShadow: '0 0 30px hsla(45, 93%, 58%, 0.3)',
              border: '1px solid hsla(45, 93%, 58%, 0.3)'
            }}
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'hsl(45, 93%, 70%)' }} />
          </motion.div>
          
          {/* Zap - Navy Blue */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="p-3 sm:p-4 rounded-xl glass"
            style={{ 
              boxShadow: '0 0 30px hsla(215, 90%, 55%, 0.3)',
              border: '1px solid hsla(215, 90%, 55%, 0.3)'
            }}
          >
            <Zap className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'hsl(215, 90%, 70%)' }} />
          </motion.div>
        </motion.div>

        {/* CTA Button with gradient */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, hsl(28, 95%, 55%), hsl(215, 90%, 55%))',
            boxShadow: '0 0 30px hsla(28, 95%, 55%, 0.4), 0 0 60px hsla(215, 90%, 55%, 0.2)'
          }}
          whileHover={{ 
            boxShadow: '0 0 40px hsla(28, 95%, 55%, 0.6), 0 0 80px hsla(215, 90%, 55%, 0.4)'
          }}
        >
          Scroll to explore the world of Resultyst
          <span className="inline-block animate-bounce text-xs sm:text-sm">👇</span>
        </motion.a>
      </div>


    </section>
  );
};

export default HeroSection;
