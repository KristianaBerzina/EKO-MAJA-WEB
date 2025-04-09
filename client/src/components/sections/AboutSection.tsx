import SectionTitle from "@/components/ui/SectionTitle";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jānis Ozols",
    role: "Dibinātājs & Arhitekts",
    description: "Ar 15+ gadu pieredzi ilgtspējīgā būvniecībā un arhitektūrā.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Anna Bērziņa",
    role: "Dizainere & Projektu vadītāja",
    description: "Specializējas efektīvu un estētisku telpu plānošanā.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Kārlis Liepa",
    role: "Inženieris & Tehnoloģiju eksperts",
    description: "Atbild par inovatīviem un energoefektīviem risinājumiem.",
    imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  }
];

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>Par mums</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl font-heading font-semibold mb-4">Mūsu misija</h3>
              <p className="mb-6 text-lg">
                EKO-MĀJA piedāvā videi draudzīgas, ilgtspējīgas un energoefektīvas moduļu mājas, 
                kas ir viegli transportējamas un uzstādāmas jebkurā vietā.
              </p>
              <p className="mb-6 text-lg">
                Mēs koncentrējamies uz zaļām tehnoloģijām, inovatīviem risinājumiem un augstākās 
                kvalitātes materiāliem, lai radītu dzīvojamos moduļus, kas ne tikai samazina ekoloģisko pēdu, 
                bet arī nodrošina komfortablu dzīvesvietu.
              </p>
              <p className="text-lg">
                Mūsu vērtības ir ilgtspēja, inovācija, kvalitāte un klientu apmierinātība.
              </p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1593604572577-1c6c44fa2804?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="EKO-MĀJA komanda" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
              <p className="mt-4 text-center italic text-gray-600">
                Mūsu komanda strādā, lai radītu inovatīvus dzīvojamos risinājumus
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-4">Mūsu komanda</h3>
            <p className="mb-8 text-lg">
              Mūsu komandu veido ilggadēji būvniecības, dizaina un ilgtspējīgu risinājumu 
              eksperti ar pieredzi gan Latvijas, gan starptautiskajā tirgū.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    imageUrl={member.imageUrl}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
