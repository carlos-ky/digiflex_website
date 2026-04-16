import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Trust from '@/components/Trust';
import Approach from '@/components/Approach';
import PortfolioPreview from '@/components/PortfolioPreview';
import BlogPreview from '@/components/BlogPreview';
import AboutPreview from '@/components/AboutPreview';
import CTABand from '@/components/CTABand';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <Approach />
      <PortfolioPreview />
      <BlogPreview />
      <AboutPreview />
      <CTABand />
      <ContactSection />
    </>
  );
}
