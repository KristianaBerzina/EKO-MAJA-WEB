import SectionTitle from "@/components/ui/SectionTitle";
import FeatureCard from "@/components/ui/FeatureCard";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, Home, BarChart2, DollarSign } from "lucide-react";

const features = [
  {
    title: "Energoefektivitāte",
    description: "Mūsu mājas ir projektētas ar augstu energoefektivitāti, samazinot apkures izmaksas un ietekmi uz vidi.",
    icon: Zap
  },
  {
    title: "Ilgtspējīgi materiāli",
    description: "Izmantojam videi draudzīgus materiālus un ilgtspējīgus ražošanas procesus, lai samazinātu ekoloģisko pēdu.",
    icon: Shield
  },
  {
    title: "Ātra uzstādīšana",
    description: "Mūsu moduļu mājas tiek uzstādītas ievērojami ātrāk nekā tradicionālās, ļaujot jums ātrāk ievākties savā jaunajā mājā.",
    icon: Clock
  },
  {
    title: "Pielāgojamība",
    description: "Katru māju var pielāgot jūsu specifiskajām vajadzībām, nodrošinot, ka tā pilnībā atbilst jūsu dzīvesveidam.",
    icon: Home
  },
  {
    title: "Kvalitātes kontrole",
    description: "Mūsu kontrolētajā ražošanas vidē mēs nodrošinām konsekventu kvalitāti un augstus standartus katrā mājā.",
    icon: BarChart2
  },
  {
    title: "Izmaksu efektivitāte",
    description: "Optimizēts ražošanas process un ilgtspējīgs dizains nodrošina izmaksu efektivitāti gan īstermiņā, gan ilgtermiņā.",
    icon: DollarSign
  }
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center">Kāpēc izvēlēties EKO-MĀJA?</SectionTitle>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard 
                title={feature.title} 
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
