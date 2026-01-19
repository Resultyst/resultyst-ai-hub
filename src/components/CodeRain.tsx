import { useEffect, useRef } from 'react';

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

    // AI/ML terms to display
    const terms = [
      'AI', 'ML', 'DATA', 'NEURAL', 'DEEP', 'LEARNING', 'GPT', 'LLM', 'NLP',
      'VISION', 'AUTOMATION', 'RPA', 'TRANSFORMER', 'PREDICT', 'MODEL',
      'ALGORITHM', 'TENSOR', 'GRADIENT', 'EPOCH', 'TRAIN', 'INFERENCE',
      'ANALYTICS', 'SCIENCE', 'NETWORK', 'LAYER', 'NODE', 'WEIGHT', 'BIAS',
      'FEATURE', 'CLASSIFY', 'CLUSTER', 'REGRESS', 'GAN', 'VAE', 'CNN', 'RNN'
    ];

    const fontSize = 14;
    const columnSpacing = fontSize * 3; // Space columns out a bit
    const columns = Math.floor(canvas.width / columnSpacing);
    
    // Track each column's current term and reveal state
    interface ColumnState {
      term: string;
      y: number;
      revealCount: number;
      lastRevealY: number;
      speed: number;
    }
    
    const columnStates: ColumnState[] = new Array(columns).fill(null).map(() => {
      const startY = Math.random() * -100 - 10;
      return {
        term: terms[Math.floor(Math.random() * terms.length)],
        y: startY,
        revealCount: 1,
        lastRevealY: startY,
        speed: 0.06 + Math.random() * 0.04 // Varied speeds
      };
    });

    const animate = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(10, 15, 25, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columnStates.length; i++) {
        const state = columnStates[i];
        const x = i * columnSpacing + columnSpacing / 2;

        // Draw all revealed letters of the word
        for (let k = 0; k < state.revealCount && k < state.term.length; k++) {
          const char = state.term[k];
          const yPos = (state.y + k) * fontSize;
          
          // Skip if above screen
          if (yPos < 0) continue;
          
          const isLeadingChar = k === state.revealCount - 1;
          
          if (isLeadingChar) {
            // Glow effect on the leading character
            ctx.shadowColor = 'hsla(199, 89%, 48%, 0.9)';
            ctx.shadowBlur = 15;
            ctx.fillStyle = 'hsla(199, 89%, 75%, 1)';
            ctx.fillText(char, x, yPos);
            ctx.shadowBlur = 0;
          } else {
            // Trail letters - fade based on distance from head
            const distanceFromHead = state.revealCount - 1 - k;
            const opacity = Math.max(0.3, 0.8 - distanceFromHead * 0.15);
            ctx.fillStyle = `hsla(199, 89%, 55%, ${opacity})`;
            ctx.fillText(char, x, yPos);
          }
        }

        // Reveal next letter when moved enough
        if (state.y - state.lastRevealY >= 1.2 && state.revealCount < state.term.length) {
          state.revealCount += 1;
          state.lastRevealY = state.y;
        }

        // Reset when word has exited the screen
        if (state.y * fontSize > canvas.height + fontSize * 2) {
          state.term = terms[Math.floor(Math.random() * terms.length)];
          state.y = -state.term.length - Math.random() * 30;
          state.revealCount = 1;
          state.lastRevealY = state.y;
          state.speed = 0.06 + Math.random() * 0.04;
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
      style={{ opacity: 0.4 }}
    />
  );
};

export default CodeRain;
