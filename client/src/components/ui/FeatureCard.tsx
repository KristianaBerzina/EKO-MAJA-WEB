import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon | ComponentType<any>;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="text-center">
      <motion.div 
        className="bg-primary/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon className="h-10 w-10 text-primary" />
      </motion.div>
      <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
