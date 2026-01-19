import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/50">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold gradient-text">Resultyst</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-muted-foreground text-center"
          >
            Building the future, one experiment at a time.
          </motion.p>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>© {new Date().getFullYear()}</span>
          </motion.div>
        </div>

        {/* Bottom wave decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <svg
            width="200"
            height="20"
            viewBox="0 0 200 20"
            className="text-primary/20"
          >
            <motion.path
              d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
