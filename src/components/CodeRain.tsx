import { useEffect, useRef } from 'react';

// Word categories with their colors
const wordCategories = {
  ml: {
    terms: ['CNN', 'RNN', 'LSTM', 'GAN', 'VAE', 'TRAIN', 'EPOCH', 'GRADIENT', 'TENSOR', 'LAYER', 'WEIGHT', 'BIAS'],
    hue: 199, // Cyan
    saturation: 89
  },
  ai: {
    terms: ['GPT', 'LLM', 'NLP', 'NEURAL', 'DEEP', 'TRANSFORMER', 'INFERENCE', 'MODEL', 'PREDICT'],
    hue: 270, // Purple
    saturation: 80
  },
  data: {
    terms: ['DATA', 'ANALYTICS', 'SCIENCE', 'FEATURE', 'CLASSIFY', 'CLUSTER', 'REGRESS', 'ALGORITHM'],
    hue: 160, // Green
    saturation: 84
  },
  general: {
    terms: ['AI', 'ML', 'LEARNING', 'AUTOMATION', 'RPA', 'VISION', 'NETWORK', 'NODE', 'CODE'],
    hue: 330, // Pink
    saturation: 85
  }
};

// Flatten and tag all terms with their colors
const allTerms = Object.entries(wordCategories).flatMap(([category, { terms, hue, saturation }]) =>
  terms.map(term => ({ term, hue, saturation }))
);

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 20;
    const columnSpacing = fontSize * 4;
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
    
    const getRandomTerm = () => {
      const item = allTerms[Math.floor(Math.random() * allTerms.length)];
      return item;
    };

    const columnStates: ColumnState[] = new Array(columns).fill(null).map(() => {
      const startY = Math.random() * -100 - 10;
      const { term, hue, saturation } = getRandomTerm();
      return {
        term,
        hue,
        saturation,
        y: startY,
        revealCount: 1,
        lastRevealY: startY,
        speed: 0.06 + Math.random() * 0.04
      };
    });

    const animate = () => {
      // Clear canvas completely each frame
      ctx.fillStyle = 'rgb(10, 15, 25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
            ctx.shadowBlur = 8;
            ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, 95%, 1)`;
            ctx.fillText(char, x, yPos);
            ctx.shadowBlur = 0;
          } else {
            // Trail letters in category color
            const distanceFromHead = state.revealCount - 1 - k;
            const lightness = Math.max(40, 70 - distanceFromHead * 8);
            ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, ${lightness}%, 1)`;
            ctx.fillText(char, x, yPos);
          }
        }

        // Draw fading trail behind the word
        for (let trail = 1; trail <= 4; trail++) {
          const trailY = Math.floor(state.y + state.revealCount - 1 + trail) * fontSize;
          if (trailY > 0 && trailY < canvas.height) {
            const trailOpacity = 0.3 - (trail * 0.07);
            if (trailOpacity > 0) {
              ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, 50%, ${trailOpacity})`;
              ctx.fillText('│', x, trailY);
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
          const { term, hue, saturation } = getRandomTerm();
          state.term = term;
          state.hue = hue;
          state.saturation = saturation;
          state.y = -state.term.length - Math.random() * 30;
          state.revealCount = 1;
          state.lastRevealY = state.y;
          state.speed = 0.08 + Math.random() * 0.05;
        }

        state.y += state.speed;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

export default CodeRain;
