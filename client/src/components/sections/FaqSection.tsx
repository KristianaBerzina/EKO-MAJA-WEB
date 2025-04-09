import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "Cik ilgs ir moduļu mājas uzstādīšanas process?",
    answer: "Atkarībā no moduļa lieluma un sarežģītības, uzstādīšanas process parasti aizņem no 1 līdz 3 nedēļām. Mūsu EKO Mini mājas var uzstādīt jau 1 nedēļā, kamēr lielākas mājas, piemēram, EKO Lux, var prasīt līdz 3 nedēļām."
  },
  {
    question: "Vai moduļu mājai ir nepieciešami pamati?",
    answer: "Jā, moduļu mājām ir nepieciešami pamati, taču tie ir daudz vienkāršāki nekā tradicionālajām mājām. Mēs parasti izmantojam skrūvpāļu pamatus, kas ir ātrāk uzstādāmi, videi draudzīgāki un piemērotāki dažādiem zemes veidiem."
  },
  {
    question: "Vai moduļu mājas ir energoefektīvas?",
    answer: "Mūsu moduļu mājas ir projektētas ar augstu energoefektivitāti. Tās ir labi izolētas, aprīkotas ar energoefektīviem logiem un, atkarībā no modeļa, var būt aprīkotas ar saules paneļiem vai citām atjaunojamās enerģijas tehnoloģijām. Vairumam mūsu māju ir A+ energoefektivitātes klase."
  },
  {
    question: "Vai moduļu mājas var pārvietot?",
    answer: "Jā, viena no moduļu māju galvenajām priekšrocībām ir to mobilitāte. Visas mūsu mājas ir projektētas tā, lai tās varētu transportēt uz jaunu vietu. Tas nozīmē, ka, ja maināt dzīvesvietu, jūsu māja var pārcelties kopā ar jums."
  },
  {
    question: "Kāda ir moduļu māju kalpošanas ilgums?",
    answer: "Mūsu moduļu mājas ir būvētas, lai kalpotu tikpat ilgi kā tradicionālās mājas. Ar pareizu uzturēšanu tās var kalpot 50 gadus un vairāk. Mēs piedāvājam 25 gadu garantiju konstrukcijai un 10 gadu garantiju pret ūdens bojājumiem."
  }
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center">Biežāk uzdotie jautājumi</SectionTitle>
        
        <motion.div 
          className="max-w-3xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden border-none"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-heading font-semibold text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0 text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
