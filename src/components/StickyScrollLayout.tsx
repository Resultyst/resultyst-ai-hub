import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * Responsive stacked flashcard scroll layout using Framer Motion + CSS position: sticky.
 *
 * Sizing & Spacing:
 * - On Mobile (< 768px): Cards stack naturally in standard document flow (`relative h-auto py-12`)
 *   to ensure no content is clipped and remains 100% accessible.
 * - On Desktop/Tablet (>= 768px): Cards stack dynamically (`sticky top-0 h-screen`)
 *   and peel over each other on scroll with scaling and scrim dimming.
 */

interface StickyScrollLayoutProps {
  sections: {
    component: ReactNode;
    accentColor?: string;
  }[];
}

interface StickyCardProps {
  component: ReactNode;
  accentColor?: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

const StickyCard = ({ component, accentColor, index, total, scrollYProgress }: StickyCardProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const isLast = index === total - 1;
  const startProgress = index / (total - 1);
  const endProgress = (index + 1) / (total - 1);

  // Framer Motion transforms for depth layering effect
  const rawScale = useTransform(
    scrollYProgress,
    [0, startProgress, endProgress, 1],
    [1, 1, 0.94, 0.94]
  );

  const rawScrimOpacity = useTransform(
    scrollYProgress,
    [0, startProgress, endProgress, 1],
    [0, 0, 0.55, 0.55]
  );

  const rawTranslateY = useTransform(
    scrollYProgress,
    [0, startProgress, endProgress, 1],
    [0, 0, -24, -24]
  );

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, startProgress, endProgress, 1],
    [1, 1, 0, 0]
  );

  // Conditional transforms only active when sticky layout is active (width >= 768px)
  const scale = !isDesktop || isLast ? 1 : rawScale;
  const scrimOpacity = !isDesktop || isLast ? 0 : rawScrimOpacity;
  const translateY = !isDesktop || isLast ? 0 : rawTranslateY;
  const contentOpacity = !isDesktop || isLast ? 1 : rawOpacity;

  return (
    <div
      className="relative md:sticky md:top-7 h-auto md:h-screen w-full flex items-center justify-center px-4 md:px-0"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        className="card-panel relative h-auto md:h-[88vh] w-full md:w-[94%] md:max-w-6xl py-12 md:py-0 flex items-center justify-center"
        style={{
          borderRadius: isDesktop ? '1.75rem' : '1.25rem',
          overflow: 'hidden',
          scale,
          y: translateY,
          transformOrigin: 'top center',
          // Glassmorphism border — subtle accent-tinted edge (always visible for visual structure)
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: `hsla(${accentColor || '28, 95%, 55%'}, 0.18)`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3),
                     0 2px 12px rgba(0, 0, 0, 0.2),
                     0 0 30px hsla(${accentColor || '28, 95%, 55%'}, 0.1),
                     inset 0 1px 0 rgba(255, 255, 255, 0.07),
                     inset 0 -1px 0 rgba(255, 255, 255, 0.03)`,
        }}
      >
        {/* Top accent glow line — vivid neon strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20"
          style={{
            background: `linear-gradient(90deg, transparent 5%, hsla(${accentColor || '28, 95%, 55%'}, 0.7) 30%, hsla(${accentColor || '28, 95%, 55%'}, 0.9) 50%, hsla(${accentColor || '28, 95%, 55%'}, 0.7) 70%, transparent 95%)`,
          }}
        />

        {/* Bottom subtle accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
          style={{
            background: `linear-gradient(90deg, transparent 10%, hsla(${accentColor || '28, 95%, 55%'}, 0.2) 40%, hsla(${accentColor || '28, 95%, 55%'}, 0.35) 50%, hsla(${accentColor || '28, 95%, 55%'}, 0.2) 60%, transparent 90%)`,
          }}
        />

        {/* Left edge subtle glow */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[1px] z-20"
          style={{
            background: `linear-gradient(180deg, transparent 10%, hsla(${accentColor || '28, 95%, 55%'}, 0.15) 30%, hsla(${accentColor || '28, 95%, 55%'}, 0.25) 50%, hsla(${accentColor || '28, 95%, 55%'}, 0.15) 70%, transparent 90%)`,
          }}
        />

        {/* Right edge subtle glow */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[1px] z-20"
          style={{
            background: `linear-gradient(180deg, transparent 10%, hsla(${accentColor || '28, 95%, 55%'}, 0.15) 30%, hsla(${accentColor || '28, 95%, 55%'}, 0.25) 50%, hsla(${accentColor || '28, 95%, 55%'}, 0.15) 70%, transparent 90%)`,
          }}
        />

        {/* Corner accent glow — top-left */}
        <div
          className="absolute top-0 left-0 w-24 h-24 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top left, hsla(${accentColor || '28, 95%, 55%'}, 0.12), transparent 70%)`,
          }}
        />

        {/* Corner accent glow — top-right */}
        <div
          className="absolute top-0 right-0 w-24 h-24 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, hsla(${accentColor || '28, 95%, 55%'}, 0.1), transparent 70%)`,
          }}
        />

        {/* Stacking scrim — glass-tinted dark overlay instead of pure black */}
        {!isLast && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 rounded-[inherit]"
            style={{
              opacity: scrimOpacity,
              background: 'linear-gradient(180deg, hsla(220, 20%, 3%, 0.9) 0%, hsla(220, 15%, 5%, 0.85) 100%)',
              backdropFilter: 'blur(2px)',
            }}
          />
        )}

        {/* Section content */}
        <motion.div 
          className="relative z-[5] h-full w-full flex items-center justify-center"
          style={{ opacity: contentOpacity }}
        >
          {component}
        </motion.div>
      </motion.div>
    </div>
  );
};

const StickyScrollLayout = ({ sections }: StickyScrollLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire container relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative z-10 w-full">
      {sections.map((section, i) => (
        <StickyCard
          key={i}
          component={section.component}
          accentColor={section.accentColor}
          index={i}
          total={sections.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

export default StickyScrollLayout;
