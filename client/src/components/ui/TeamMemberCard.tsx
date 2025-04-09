import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamMemberCard = ({ name, role, description, imageUrl }: TeamMemberCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="bg-gray-50 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg h-full">
        <CardContent className="p-0 flex flex-col items-center">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h4 className="text-xl font-heading font-semibold text-center">{name}</h4>
          <p className="text-center text-gray-600 mb-3">{role}</p>
          <p className="text-center">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;
