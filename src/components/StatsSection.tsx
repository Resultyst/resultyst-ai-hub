import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Code, Brain, Briefcase, Trophy, CalendarDays } from 'lucide-react';

const stats = [
  { icon: Users, value: 5600, label: 'Subscribers', suffix: '+', hsl: '28, 95%, 55%' },
  { icon: Code, value: 15, label: 'AI Projects', suffix: '+', hsl: '215, 90%, 55%' },
  { icon: Brain, value: 5, label: 'Research Papers', suffix: '+', hsl: '28, 95%, 55%' },
  { icon: Briefcase, value: 2, label: 'Years Experience', suffix: '+', hsl: '215, 90%, 55%' },
  { icon: Trophy, value: 10, label: 'Hackathons', suffix: '', hsl: '28, 95%, 55%' },
  { icon: CalendarDays, value: 30, label: 'Events Attended', suffix: '+', hsl: '215, 90%, 55%' },
];

interface AnimatedCounterProps {
  value: number;
  isInView: boolean;
}

const AnimatedCounter = ({ value, isInView }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return <span>{formatNumber(count)}</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" ref={ref} className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden px-4 py-8">
      {/* Faded brand gradient background to prevent sharp horizontal edges */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(to bottom, transparent, hsla(28, 95%, 55%, 0.08) 30%, hsla(215, 90%, 55%, 0.08) 70%, transparent)'
        }}
      />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'conic-gradient(from 0deg, hsla(28, 95%, 55%, 0.1), hsla(215, 90%, 55%, 0.1), hsla(28, 95%, 55%, 0.1))'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 w-full max-w-2xl mx-auto"
        >
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'linear-gradient(135deg, hsla(28, 95%, 55%, 0.2), hsla(215, 90%, 55%, 0.1))',
              border: '1px solid hsla(28, 95%, 55%, 0.3)',
              color: 'hsl(28, 95%, 70%)'
            }}
          >
            Stats
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 60%), hsl(215, 90%, 60%))' }}
            >
              Collective Intelligence
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, hsla(${stat.hsl}, 0.2), hsla(${stat.hsl}, 0.05))`,
                    border: `1px solid hsla(${stat.hsl}, 0.3)`,
                    boxShadow: `0 0 20px hsla(${stat.hsl}, 0.2)`
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 40px hsla(${stat.hsl}, 0.4)`
                  }}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `hsl(${stat.hsl})` }} />
                </motion.div>
                <div 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2"
                  style={{ color: `hsl(${stat.hsl})` }}
                >
                  <AnimatedCounter value={stat.value} isInView={isInView} />
                  {stat.suffix}
                </div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
