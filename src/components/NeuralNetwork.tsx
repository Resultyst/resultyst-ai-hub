import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isPausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

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
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Fewer nodes on mobile
    const nodeCount = isMobile
      ? Math.min(30, Math.floor((window.innerWidth * window.innerHeight) / 25000))
      : Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
    }

    nodesRef.current = nodes;

    // Mouse tracking (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Reduced connection distance on mobile
    const connectionDistance = isMobile ? 100 : 150;
    const mouseInfluence = 200;

    // Animation loop
    const animate = () => {
      if (isPausedRef.current) {
        animationRef.current = undefined;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Mouse influence (desktop only)
        if (!isMobile) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const mouseDistance = Math.sqrt(dx * dx + dy * dy);

          if (mouseDistance < mouseInfluence) {
            const force = (1 - mouseDistance / mouseInfluence) * 0.02;
            node.vx += dx * force;
            node.vy += dy * force;
          }
        }

        // Apply velocity with damping
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const cdx = other.x - node.x;
          const cdy = other.y - node.y;
          const distance = Math.sqrt(cdx * cdx + cdy * cdy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.5;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, `hsla(28, 95%, 55%, ${opacity})`);
            gradient.addColorStop(0.5, `hsla(45, 93%, 58%, ${opacity})`);
            gradient.addColorStop(1, `hsla(215, 90%, 55%, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node
        const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 4);
        nodeGradient.addColorStop(0, 'hsla(28, 95%, 70%, 1)');
        nodeGradient.addColorStop(0.5, 'hsla(28, 95%, 55%, 0.8)');
        nodeGradient.addColorStop(1, 'hsla(28, 95%, 55%, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Draw glow (skip on mobile to save GPU)
        if (!isMobile) {
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15);
          glowGradient.addColorStop(0, 'hsla(28, 95%, 55%, 0.3)');
          glowGradient.addColorStop(1, 'hsla(28, 95%, 55%, 0)');

          ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
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
      style={{ opacity: 0.6 }}
    />
  );
};

export default NeuralNetwork;
