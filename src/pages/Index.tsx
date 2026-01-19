import NeuralNetwork from '@/components/NeuralNetwork';
import ParticleField from '@/components/ParticleField';
import CodeRain from '@/components/CodeRain';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperimentsSection from '@/components/ExperimentsSection';
import StatsSection from '@/components/StatsSection';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background animations - layered for depth */}
      <CodeRain />
      <NeuralNetwork />
      <ParticleField />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperimentsSection />
        <StatsSection />
        <CommunitySection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
