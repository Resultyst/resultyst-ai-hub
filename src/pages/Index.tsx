import Navbar from '@/components/Navbar';
import NeuralNetwork from '@/components/NeuralNetwork';
import ParticleField from '@/components/ParticleField';
import CodeRain from '@/components/CodeRain';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperimentsSection from '@/components/ExperimentsSection';
import StatsSection from '@/components/StatsSection';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';
import StickyScrollLayout from '@/components/StickyScrollLayout';

// Each section gets an accent colour that tints its card border/glow
const sections = [
  { component: <HeroSection />,         accentColor: '28, 95%, 55%'  }, // Orange
  { component: <AboutSection />,        accentColor: '215, 90%, 55%' }, // Navy
  { component: <ExperimentsSection />,  accentColor: '28, 95%, 55%'  }, // Orange
  { component: <CommunitySection />,    accentColor: '215, 90%, 55%' }, // Navy
  { component: <StatsSection />,        accentColor: '45, 93%, 58%'  }, // Amber
];

const Index = () => {
  return (
    <div className="relative bg-background" style={{ overflowX: 'clip' }}>
      {/* Fixed background canvas animations — bleed through all cards */}
      <CodeRain />
      <NeuralNetwork />
      <ParticleField />

      {/* Navigation — always on top */}
      <Navbar />

      {/* Stacked card scroll experience */}
      <StickyScrollLayout sections={sections} />

      {/* Footer — normal flow, below all cards */}
      <Footer />
    </div>
  );
};

export default Index;
