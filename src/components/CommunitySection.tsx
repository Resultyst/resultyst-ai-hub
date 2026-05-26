import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Youtube, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

const socialLinks = [
  {
    name: 'YouTube',
    description: 'Robotics, AI tool tutorials deep dives',
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]',
    url: 'https://www.youtube.com/@Resultyst',
    cta: 'Subscribe',
  },
  {
    name: 'Instagram',
    description: 'AI insights & community updates',
    icon: Instagram,
    color: 'from-purple-500 via-pink-500 to-orange-400',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    url: 'https://www.instagram.com/resultyst/',
    cta: 'Follow',
  },
  {
    name: 'WhatsApp',
    description: 'Join the AI enthusiasts channel',
    icon: MessageCircle,
    color: 'from-green-500 to-green-600',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    url: 'https://whatsapp.com/channel/0029Vb5BpZWFXUubAH4nWI37',
    cta: 'Join',
  },
];

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="community" ref={ref} className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden px-4 py-8">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 w-full max-w-2xl mx-auto"
        >
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              background: 'linear-gradient(135deg, hsla(28, 95%, 55%, 0.2), hsla(215, 90%, 55%, 0.1))',
              border: '1px solid hsla(28, 95%, 55%, 0.3)',
              color: 'hsl(28, 95%, 70%)'
            }}
          >
            Connect
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(28, 95%, 60%), hsl(215, 90%, 60%))' }}
            >
              Join the Community
            </span>
          </h2>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
            Be part of a growing community exploring the future of AI and technology
          </p>
        </motion.div>

        {/* Social links */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {socialLinks.map(({ name, description, icon: Icon, color, hoverGlow, url,cta }, index) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative glass rounded-2xl p-6 text-center overflow-hidden transition-all duration-500 ${hoverGlow}`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10 }}
                className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                {name}
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                {description}
              </p>

              {/* Link indicator */}
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>{cta}</span>
                <ExternalLink className="w-4 h-4" />
              </div>

              {/* Corner accents */}
              <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-transparent group-hover:border-current rounded-tr-2xl transition-all duration-500 opacity-20`} />
              <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-transparent group-hover:border-current rounded-bl-2xl transition-all duration-500 opacity-20`} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
