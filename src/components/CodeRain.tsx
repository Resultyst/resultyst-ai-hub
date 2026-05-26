import { useEffect, useRef } from 'react';

// Word categories with their colors
const wordCategories = {
  ml: {
    terms: ['CNN', 'RNN', 'LSTM', 'GAN', 'VAE', 'TRAIN', 'EPOCH', 'GRADIENT', 'TENSOR', 'LAYER', 'WEIGHT', 'BIAS'],
    hue: 28, // Orange
    saturation: 95
  },
  ai: {
    terms: ['GPT', 'LLM', 'NLP', 'NEURAL', 'DEEP', 'TRANSFORMER', 'INFERENCE', 'MODEL', 'PREDICT'],
    hue: 215, // Navy Blue
    saturation: 90
  },
  data: {
    terms: ['DATA', 'ANALYTICS', 'SCIENCE', 'FEATURE', 'CLASSIFY', 'CLUSTER', 'REGRESS', 'ALGORITHM'],
    hue: 45, // Amber/Gold
    saturation: 93
  },
  general: {
    terms: ['AI', 'ML', 'LEARNING', 'AUTOMATION', 'RPA', 'VISION', 'NETWORK', 'NODE', 'CODE'],
    hue: 215, // Soft Blue
    saturation: 60
  }
};

// Flatten and tag all terms with their colors
const allTerms = Object.entries(wordCategories).flatMap(([_category, { terms, hue, saturation }]) =>
  terms.map(term => ({ term, hue, saturation }))
);

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isPausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect mobile for reduced workload
    const isMobile = window.innerWidth < 768;

    // Skip entirely on very small screens
    if (window.innerWidth < 480) {
      canvas.style.display = 'none';
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pause when tab is not visible
    const handleVisibility = () => {
      isPausedRef.current = document.hidden;
      if (!document.hidden && !animationRef.current) {
        lastFrameTime = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const fontSize = 15;
    const columnSpacing = isMobile ? fontSize * 8 : fontSize * 5;
    const columns = Math.floor(canvas.width / columnSpacing);
    
    interface ColumnState {
      term: string;
      hue: number;
      saturation: number;
      y: number;
      revealCount: number;
      lastRevealY: number;
      speed: number;
    }
    
    let termQueue: typeof allTerms = [];

    const getNextTerm = () => {
      if (termQueue.length === 0) {
        termQueue = [...allTerms];
        for (let i = termQueue.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [termQueue[i], termQueue[j]] = [termQueue[j], termQueue[i]];
        }
      }
      return termQueue.pop()!;
    };

    const columnStates: ColumnState[] = new Array(columns).fill(null).map(() => {
      const startY = Math.random() * -100 - 10;
      const { term, hue, saturation } = getNextTerm();
      return {
        term,
        hue,
        saturation,
        y: startY,
        revealCount: 1,
        lastRevealY: startY,
        speed: 0.05 + Math.random() * 0.04
      };
    });

    // Throttle to ~30fps
    const frameInterval = 1000 / 30;
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      if (isPausedRef.current) {
        animationRef.current = undefined;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);

      const delta = timestamp - lastFrameTime;
      if (delta < frameInterval) return;
      lastFrameTime = timestamp - (delta % frameInterval);

      // Clear canvas to keep it fully transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < columnStates.length; i++) {
        const state = columnStates[i];
        const x = i * columnSpacing + columnSpacing / 2;

        // Draw all revealed letters of the word
        for (let k = 0; k < state.revealCount && k < state.term.length; k++) {
          const char = state.term[k];
          const yPos = Math.floor(state.y + k) * fontSize;
          
          if (yPos < 0) continue;
          
          const isLeadingChar = k === state.revealCount - 1;
          
          if (isLeadingChar) {
            // Bright leading character with glow in category color
            ctx.shadowColor = `hsla(${state.hue}, ${state.saturation}%, 60%, 0.8)`;
            ctx.shadowBlur = 6;
            ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, 95%, 1)`;
            ctx.fillText(char, x, yPos);
            ctx.shadowBlur = 0;
          } else {
            // Trail letters fade smoothly into transparency using alpha HSL
            const distanceFromHead = state.revealCount - 1 - k;
            const opacity = Math.max(0.1, 0.7 - distanceFromHead * 0.12);
            ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, 55%, ${opacity})`;
            ctx.fillText(char, x, yPos);
          }
        }

        // Draw fading trail line behind the word (skip on mobile for perf)
        if (!isMobile) {
          for (let trail = 1; trail <= 4; trail++) {
            const trailY = Math.floor(state.y + state.revealCount - 1 + trail) * fontSize;
            if (trailY > 0 && trailY < canvas.height) {
              const trailOpacity = 0.2 - (trail * 0.05);
              if (trailOpacity > 0) {
                ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, 50%, ${trailOpacity})`;
                ctx.fillText('│', x, trailY);
              }
            }
          }
        }

        // Reveal next letter
        if (state.y - state.lastRevealY >= 1.2 && state.revealCount < state.term.length) {
          state.revealCount += 1;
          state.lastRevealY = state.y;
        }

        // Reset when word exits screen
        if (state.y * fontSize > canvas.height + fontSize * 2) {
          const { term, hue, saturation } = getNextTerm();
          state.term = term;
          state.hue = hue;
          state.saturation = saturation;
          state.y = -state.term.length - Math.random() * 30;
          state.revealCount = 1;
          state.lastRevealY = state.y;
          state.speed = 0.06 + Math.random() * 0.04;
        }

        state.y += state.speed;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.75 }}
    />
  );
};

export default CodeRain;
