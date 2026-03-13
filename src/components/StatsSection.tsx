import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Code, Sparkles, Calendar } from 'lucide-react';

const stats = [
  { icon: Users, value: 5600, label: 'Subscribers', suffix: '+', hsl: '330, 85%, 60%' },
  { icon: Code, value: 15, label: 'AI Projects', suffix: '+', hsl: '199, 89%, 48%' },
  { icon: Sparkles, value: 5, label: 'Research Papers', suffix: '+', hsl: '270, 80%, 60%' },
  { icon: Calendar, value: 2, label: 'Years Experience', suffix: '+', hsl: '160, 84%, 45%' },
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
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Rainbow gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, hsla(199, 89%, 48%, 0.1) 0%, hsla(270, 80%, 60%, 0.1) 33%, hsla(330, 85%, 60%, 0.1) 66%, hsla(160, 84%, 45%, 0.1) 100%)'
        }}
      />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'conic-gradient(from 0deg, hsla(199, 89%, 48%, 0.1), hsla(270, 80%, 60%, 0.1), hsla(330, 85%, 60%, 0.1), hsla(160, 84%, 45%, 0.1), hsla(199, 89%, 48%, 0.1))'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
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
                  <Icon className="w-8 h-8" style={{ color: `hsl(${stat.hsl})` }} />
                </motion.div>
                <div 
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: `hsl(${stat.hsl})` }}
                >
                  <AnimatedCounter value={stat.value} isInView={isInView} />
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
