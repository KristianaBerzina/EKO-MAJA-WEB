import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location, setLocation] = useLocation();
  
  useEffect(() => {
    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Find the element and scroll to it with offset for the fixed header
        const element = document.querySelector(hash);
        if (element) {
          const headerHeight = 80; // Approximate height of header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };

    // Run on mount and when hash changes
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Set page title and meta description
  useEffect(() => {
    document.title = "EKO-MĀJA | Ilgtspējīgas Moduļu Mājas";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      'EKO-MĀJA ražo videi draudzīgas, energoefektīvas moduļu mājas, kuras ir viegli transportējamas un uzstādāmas jebkurā vietā. Ilgtspējīgi dzīvojamie risinājumi.'
    );
  }, []);

  return (
    <main className="font-sans antialiased">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <FeaturesSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
};

export default Home;
