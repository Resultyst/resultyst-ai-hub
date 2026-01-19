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
    
    // Track each column's current term and character index
    interface ColumnState {
      term: string;
      charIndex: number;
      y: number;
      lastCharY: number;
    }
    
    const columnStates: ColumnState[] = new Array(columns).fill(null).map(() => ({
      term: terms[Math.floor(Math.random() * terms.length)],
      charIndex: 0,
      y: Math.random() * -100,
      lastCharY: 0
    }));

    const animate = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(10, 15, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columnStates.length; i++) {
        // Only render some columns for subtlety
        if (i % 4 !== 0) continue;

        const state = columnStates[i];
        const char = state.term[state.charIndex];
        const x = i * fontSize;
        const y = state.y * fontSize;

        // Gradient effect - brighter at the bottom of the trail
        const gradient = ctx.createLinearGradient(x, y - 50, x, y);
        gradient.addColorStop(0, 'hsla(199, 89%, 48%, 0)');
        gradient.addColorStop(0.8, 'hsla(199, 89%, 48%, 0.3)');
        gradient.addColorStop(1, 'hsla(199, 89%, 60%, 0.6)');

        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        // Glow effect on the leading character
        ctx.shadowColor = 'hsla(199, 89%, 48%, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'hsla(199, 89%, 70%, 0.8)';
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Only move to next character when we've fallen 1 unit (one character height)
        if (state.y - state.lastCharY >= 1) {
          state.charIndex = (state.charIndex + 1) % state.term.length;
          state.lastCharY = state.y;
          
          // When term completes a cycle, occasionally pick a new term
          if (state.charIndex === 0 && Math.random() > 0.7) {
            state.term = terms[Math.floor(Math.random() * terms.length)];
          }
        }

        // Reset drop randomly or when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          state.y = 0;
          state.lastCharY = 0;
          state.term = terms[Math.floor(Math.random() * terms.length)];
          state.charIndex = 0;
        }

        state.y += 0.05;
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
