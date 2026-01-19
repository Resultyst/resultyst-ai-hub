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
    const columns = Math.floor(canvas.width / fontSize);
    
    // Track each column's current term and reveal state
    interface ColumnState {
      term: string;
      y: number;
      revealCount: number;
      lastRevealY: number;
    }
    
    const columnStates: ColumnState[] = new Array(columns).fill(null).map(() => {
      const startY = Math.random() * -50 - 10;
      return {
        term: terms[Math.floor(Math.random() * terms.length)],
        y: startY,
        revealCount: 1,
        lastRevealY: startY
      };
    });

    const animate = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(10, 15, 25, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columnStates.length; i++) {
        // Only render some columns for subtlety
        if (i % 4 !== 0) continue;

        const state = columnStates[i];
        const x = i * fontSize;

        // Draw all revealed letters of the word
        for (let k = 0; k < state.revealCount && k < state.term.length; k++) {
          const char = state.term[k];
          const yPos = (state.y + k) * fontSize;
          
          // Skip if above screen
          if (yPos < 0) continue;
          
          const isLeadingChar = k === state.revealCount - 1;
          
          if (isLeadingChar) {
            // Glow effect on the leading character
            ctx.shadowColor = 'hsla(199, 89%, 48%, 0.8)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = 'hsla(199, 89%, 70%, 0.9)';
            ctx.fillText(char, x, yPos);
            ctx.shadowBlur = 0;
          } else {
            // Softer fill for older letters (trail effect)
            const fadeAmount = 1 - (k / state.term.length) * 0.3;
            ctx.fillStyle = `hsla(199, 89%, 48%, ${0.5 * fadeAmount})`;
            ctx.fillText(char, x, yPos);
          }
        }

        // Reveal next letter when moved enough
        if (state.y - state.lastRevealY >= 1.5 && state.revealCount < state.term.length) {
          state.revealCount += 1;
          state.lastRevealY = state.y;
        }

        // Reset when entire word has exited the screen
        const wordBottomY = (state.y + state.term.length) * fontSize;
        if (state.y * fontSize > canvas.height + fontSize) {
          // Pick a new random term
          state.term = terms[Math.floor(Math.random() * terms.length)];
          state.y = -state.term.length - Math.random() * 20;
          state.revealCount = 1;
          state.lastRevealY = state.y;
        }

        state.y += 0.08;
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
      style={{ opacity: 0.15 }}
    />
  );
};

export default CodeRain;
