import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Kļūda",
        description: "Lūdzu, ievadiet e-pasta adresi.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Paldies!",
      description: "Jūs esat veiksmīgi pieteicies jaunumu saņemšanai.",
    });
    
    setEmail("");
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">EKO-MĀJA</h3>
            <p className="mb-6">
              Mēs ražojam videi draudzīgas, energoefektīvas moduļu mājas. 
              Mūsu mērķis ir piedāvāt ilgtspējīgus dzīvojamos risinājumus, 
              kas uzlabo dzīves kvalitāti.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#D9B99B] transition duration-300"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#D9B99B] transition duration-300"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#D9B99B] transition duration-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Produkti</h3>
            <ul className="space-y-3">
              <li><a href="#products" className="hover:text-[#D9B99B] transition duration-300">EKO Mini</a></li>
              <li><a href="#products" className="hover:text-[#D9B99B] transition duration-300">EKO Standard</a></li>
              <li><a href="#products" className="hover:text-[#D9B99B] transition duration-300">EKO Office</a></li>
              <li><a href="#products" className="hover:text-[#D9B99B] transition duration-300">EKO Lux</a></li>
              <li><a href="#contact" className="hover:text-[#D9B99B] transition duration-300">Pielāgoti risinājumi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Svarīgas saites</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-[#D9B99B] transition duration-300">Par mums</a></li>
              <li><a href="#" className="hover:text-[#D9B99B] transition duration-300">Privātuma politika</a></li>
              <li><a href="#" className="hover:text-[#D9B99B] transition duration-300">Lietošanas noteikumi</a></li>
              <li><a href="#" className="hover:text-[#D9B99B] transition duration-300">Piegādes informācija</a></li>
              <li><a href="#" className="hover:text-[#D9B99B] transition duration-300">Garantijas</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Jaunumi</h3>
            <p className="mb-4">
              Piesakieties mūsu jaunumu saņemšanai, lai uzzinātu par jaunākajiem produktiem un piedāvājumiem:
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                type="email"
                placeholder="Jūsu e-pasts"
                className="rounded-l-lg rounded-r-none border-white bg-white text-black focus-visible:ring-0 focus-visible:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="rounded-l-none bg-[#D9B99B] text-primary hover:bg-[#F2E3D5]"
              >
                Pieteikties
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} EKO-MĀJA. Visas tiesības aizsargātas. Reģ. Nr.: LV12345678901</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
