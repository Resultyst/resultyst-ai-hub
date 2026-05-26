import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const copyrightText = "Resultyst — Built & Curated by Suryaa Narayanan K";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    setDisplayText("");

    const timer = setInterval(() => {
      index++;
      setDisplayText(copyrightText.slice(0, index));
      if (index >= copyrightText.length) {
        clearInterval(timer);
      }
    }, 60); // Matches typing speed of 60ms

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <footer ref={ref} className="relative py-8 sm:py-12 px-4 border-t border-border/50">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Tagline */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl font-bold text-center"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 60%), hsl(215, 90%, 60%))' }}
            >
              Artificial Intelligence can augment Human Intelligence
            </span>
          </motion.h3>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-400 font-mono"
          >
            <span>© {new Date().getFullYear()}</span>
            <span className="text-slate-300 font-semibold">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-[2px] h-[1.1em] ml-0.5"
              style={{
                backgroundColor: 'hsl(28, 95%, 55%)',
              }}
            />
          </motion.div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
