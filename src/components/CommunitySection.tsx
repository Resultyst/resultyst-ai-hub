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
  },
  {
    name: 'Instagram',
    description: 'Daily AI insights & community updates',
    icon: Instagram,
    color: 'from-purple-500 via-pink-500 to-orange-400',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    url: 'https://www.instagram.com/resultyst/',
  },
  {
    name: 'WhatsApp',
    description: 'Join the AI enthusiasts channel',
    icon: MessageCircle,
    color: 'from-green-500 to-green-600',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    url: 'https://whatsapp.com/channel/0029Vb5BpZWFXUubAH4nWI37',
  },
];

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent/20 text-accent">
            Connect
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Join the <span className="gradient-text">Community</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Be part of a growing community exploring the future of AI and technology.
          </p>
        </motion.div>

        {/* Social links */}
        <div className="grid md:grid-cols-3 gap-6">
          {socialLinks.map(({ name, description, icon: Icon, color, hoverGlow, url }, index) => (
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
              <p className="text-sm text-muted-foreground mb-4">
                {description}
              </p>

              {/* Link indicator */}
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Follow</span>
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
