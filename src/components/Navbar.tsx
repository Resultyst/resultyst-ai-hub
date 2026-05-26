import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'AI Hub', href: '#experiments' },
  { label: 'Connect', href: '#community' },
  { label: 'Stats', href: '#stats' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Check if we are on a mobile viewport to adjust brand name behavior
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect for navbar brand (only cycles on desktop)
  const words = useMemo(() => {
    return isMobile ? ["Resultyst"] : ["Suryaa Narayanan's Personal Brand", "Resultyst"];
  }, [isMobile]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleType = () => {
      const activeWord = words[currentWordIndex];
      
      if (words.length === 1) {
        setDisplayText(activeWord);
        return;
      }
      
      if (!isDeleting) {
        setDisplayText(activeWord.substring(0, displayText.length + 1));
        setTypingSpeed(60); // Matches HeroSection signature typing speed (60ms)
        
        if (displayText === activeWord) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
          return;
        }
      } else {
        setDisplayText(activeWord.substring(0, displayText.length - 1));
        setTypingSpeed(30); // Faster backspacing
        
        if (displayText === "") {
          timer = setTimeout(() => {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }, 500);
          return;
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, currentWordIndex, words]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3'
          : 'py-5'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        backgroundColor: isScrolled ? 'hsla(220, 10%, 2%, 0.75)' : 'transparent',
        borderBottom: isScrolled ? '1px solid hsla(220, 10%, 15%, 0.2)' : '1px solid transparent',
        boxShadow: isScrolled
          ? '0 4px 30px hsla(28, 95%, 55%, 0.05), 0 1px 3px hsla(0, 0%, 0%, 0.2)'
          : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Left Column: Logo */}
        <div className="flex justify-start items-center">
          <motion.a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.img
              src="/logo.png"
              alt="Resultyst Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              whileHover={{
                scale: 1.08,
                filter: 'drop-shadow(0 0 8px hsla(28, 95%, 55%, 0.5))'
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="flex items-center text-base font-bold select-none w-auto md:w-[280px] overflow-hidden whitespace-nowrap">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 55%), hsl(215, 90%, 55%))',
                }}
              >
                {displayText}
              </span>
              {!isMobile && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block w-[2px] h-[1.1em] ml-0.5 animate-pulse"
                  style={{
                    backgroundColor: 'hsl(28, 95%, 55%)',
                  }}
                />
              )}
            </span>
          </motion.a>
        </div>

        {/* Center Column: Navigation Links */}
        <div className="hidden md:flex justify-center items-center">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 rounded-lg hover:text-foreground group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover background */}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, hsla(28, 95%, 55%, 0.08), hsla(215, 90%, 55%, 0.08))',
                    border: '1px solid hsla(28, 95%, 55%, 0.1)',
                  }}
                />
                <span className="relative">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="flex justify-end items-center gap-4">
          <motion.a
            href="https://www.youtube.com/@Resultyst"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, hsl(28, 95%, 55%), hsl(215, 90%, 55%))',
              boxShadow: '0 0 20px hsla(28, 95%, 55%, 0.3)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px hsla(28, 95%, 55%, 0.5), 0 0 60px hsla(215, 90%, 55%, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.a>

          <motion.button
            className="md:hidden p-2 rounded-lg text-muted-foreground"
            style={{
              background: 'hsla(220, 10%, 8%, 0.5)',
              border: '1px solid hsla(220, 10%, 15%, 0.3)',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? 'auto' : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden"
        style={{
          background: 'hsla(220, 10%, 2%, 0.95)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors duration-300"
              style={{
                background: 'hsla(220, 10%, 8%, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="https://www.youtube.com/@Resultyst"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-white text-center transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, hsl(28, 95%, 55%), hsl(215, 90%, 55%))',
            }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
