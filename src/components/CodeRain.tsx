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

    // Matrix characters (mix of AI/ML related symbols)
    const chars = 'AIML01∑∏∫∂∇λσμπθ{}[]<>=/+*&|~^%#@!データ科学人工知能';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Randomize initial positions
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    const animate = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(10, 15, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Only render some columns for subtlety
        if (i % 4 !== 0) continue;

        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

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

        // Reset drop randomly or when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 0.5;
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
