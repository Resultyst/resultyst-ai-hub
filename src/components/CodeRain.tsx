import { useEffect, useRef } from 'react';

interface FallingTerm {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
}

const AI_TERMS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Deep Learning',
  'Neural Networks',
  'Natural Language Processing',
  'Computer Vision',
  'Generative AI',
  'Large Language Models',
  'Reinforcement Learning',
  'Data Analytics',
  'Predictive Modeling',
  'Automation',
  'RPA',
  'Transformers',
  'GPT',
  'Prompt Engineering',
  'NLP',
  'LLM',
  'AI Agents',
  'RAG',
  'Fine-Tuning',
  'Embeddings',
  'Vector Database',
  'Chatbots',
  'AI Tools',
];

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const termsRef = useRef<FallingTerm[]>([]);

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

    // Initialize falling terms
    const createTerm = (startAtTop = false): FallingTerm => {
      const fontSize = Math.random() * 10 + 12; // 12-22px
      return {
        text: AI_TERMS[Math.floor(Math.random() * AI_TERMS.length)],
        x: Math.random() * (canvas.width - 200),
        y: startAtTop ? -50 : Math.random() * canvas.height,
        speed: Math.random() * 0.3 + 0.15, // Very slow: 0.15-0.45
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5 opacity
        fontSize,
      };
    };

    // Create initial terms (sparse distribution)
    const termCount = Math.floor(canvas.width / 150); // Roughly one term per 150px
    termsRef.current = Array.from({ length: termCount }, () => createTerm(false));

    const animate = () => {
      // Clear with semi-transparent background for subtle trail
      ctx.fillStyle = 'rgba(10, 15, 25, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < termsRef.current.length; i++) {
        const term = termsRef.current[i];

        // Set font
        ctx.font = `${term.fontSize}px 'JetBrains Mono', monospace`;

        // Create glow effect
        ctx.shadowColor = 'hsla(199, 89%, 48%, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = `hsla(199, 89%, 60%, ${term.opacity})`;
        ctx.fillText(term.text, term.x, term.y);

        // Reset shadow for performance
        ctx.shadowBlur = 0;

        // Move term down
        term.y += term.speed;

        // Reset term when it goes off screen
        if (term.y > canvas.height + 50) {
          termsRef.current[i] = createTerm(true);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial clear
    ctx.fillStyle = 'rgba(10, 15, 25, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      style={{ opacity: 0.25 }}
    />
  );
};

export default CodeRain;
