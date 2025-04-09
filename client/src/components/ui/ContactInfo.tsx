import SectionTitle from "@/components/ui/SectionTitle";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <>
      <h3 className="text-2xl font-heading font-semibold mb-6">Kontaktinformācija</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-heading font-semibold mb-2">Adrese</h4>
          <p className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
            Ražošanas iela 15, Salaspils, LV-2121
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-heading font-semibold mb-2">Telefons</h4>
          <p className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-2" />
            <a href="tel:+37120123456" className="hover:text-primary transition duration-300">
              +371 2012 3456
            </a>
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-heading font-semibold mb-2">E-pasts</h4>
          <p className="flex items-center">
            <Mail className="h-5 w-5 text-primary mr-2" />
            <a href="mailto:info@eko-maja.lv" className="hover:text-primary transition duration-300">
              info@eko-maja.lv
            </a>
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-heading font-semibold mb-2">Darba laiks</h4>
          <p className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-2 mt-1" />
            <span>
              Pirmdiena - Piektdiena: 9:00 - 18:00<br />
              Sestdiena: 10:00 - 15:00<br />
              Svētdiena: Slēgts
            </span>
          </p>
        </div>
      </div>
      
      <div className="mt-10">
        <h4 className="text-lg font-heading font-semibold mb-4">Atrašanās vieta</h4>
        <div className="rounded-lg overflow-hidden shadow-lg h-64">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8661.036789796014!2d24.329293342523956!3d56.86093093628068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e932d150d11b07%3A0x7ab237f3ba39f6ff!2sSalaspils%2C%20Latvia!5e0!3m2!1sen!2sus!4v1700578981116!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="EKO-MĀJA Location Map"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
