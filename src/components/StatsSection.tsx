import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Youtube, MessageCircle, Zap } from 'lucide-react';

const stats = [
  { icon: Youtube, value: 3500, label: 'YouTube Subscribers', suffix: '+' },
  { icon: Users, value: 1000, label: 'Community Members', suffix: '+' },
  { icon: MessageCircle, value: 50, label: 'AI Tools Reviewed', suffix: '+' },
  { icon: Zap, value: 1, label: 'Year of Experience', suffix: '+' },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  isInView 
}: { 
  value: number; 
  suffix: string; 
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <span className="gradient-text text-glow">
      {formatNumber(count)}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 gradient-border relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 animated-gradient opacity-30" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label, suffix }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <AnimatedCounter value={value} suffix={suffix} isInView={isInView} />
                </div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
