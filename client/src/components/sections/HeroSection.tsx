import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 z-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
          Ekoloģiskas, mobilas un<br/>ilgtspējīgas mājas
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          Vienkārši, ātri un videi draudzīgi dzīvojamie risinājumi, kas uzlabo dzīves kvalitāti un līdzsvaro jūsu ietekmi uz vidi.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-primary text-white hover:shadow-lg"
            >
              <a href="#products">Apskatīt mūsu produktus</a>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild
              variant="outline"
              size="lg" 
              className="bg-white text-primary border-primary hover:bg-primary hover:text-white"
            >
              <a href="#contact">Piesakies konsultācijai</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
