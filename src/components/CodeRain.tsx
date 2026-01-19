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

    const fontSize = 20;
    const columnSpacing = fontSize * 4; // Space columns for word readability
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
      // Clear canvas completely each frame - no fade accumulation
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
          
          // Skip if above screen
          if (yPos < 0) continue;
          
          const isLeadingChar = k === state.revealCount - 1;
          
          if (isLeadingChar) {
            // Bright leading character with subtle glow
            ctx.shadowColor = 'hsla(199, 89%, 60%, 0.8)';
            ctx.shadowBlur = 8;
            ctx.fillStyle = 'hsla(199, 89%, 95%, 1)';
            ctx.fillText(char, x, yPos);
            ctx.shadowBlur = 0;
          } else {
            // Trail letters - bright and readable
            const distanceFromHead = state.revealCount - 1 - k;
            const lightness = Math.max(40, 70 - distanceFromHead * 8);
            ctx.fillStyle = `hsla(199, 89%, ${lightness}%, 1)`;
            ctx.fillText(char, x, yPos);
          }
        }

        // Draw fading trail behind the word
        for (let trail = 1; trail <= 4; trail++) {
          const trailY = Math.floor(state.y + state.revealCount - 1 + trail) * fontSize;
          if (trailY > 0 && trailY < canvas.height) {
            const trailOpacity = 0.3 - (trail * 0.07);
            if (trailOpacity > 0) {
              ctx.fillStyle = `hsla(199, 89%, 50%, ${trailOpacity})`;
              ctx.fillText('│', x, trailY);
            }
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
      style={{ opacity: 0.6 }}
    />
  );
};

export default CodeRain;
