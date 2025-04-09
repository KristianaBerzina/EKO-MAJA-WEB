import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import { motion } from "framer-motion";

// Product data
const products = [
  {
    id: "eko-mini",
    name: "EKO Mini – Kompakta moduļu māja",
    featured: true,
    details: {
      area: "25m², piemērota dzīvošanai vai ofisam",
      materials: "Koka karkass, ekovate izolācija, saules paneļi",
      installationTime: "1 nedēļa",
      energyEfficiency: "A+ klase, minimāli apkures izdevumi",
      mobility: "Viegli transportējama un uzstādāma jebkurā vietā"
    },
    price: "€29,500",
    imageUrl: "https://images.unsplash.com/photo-1604609165678-096d20fab1ad?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "eko-standard",
    name: "EKO Standard – Ģimenes moduļu māja",
    featured: false,
    details: {
      area: "50m²",
      materials: "Koka karkass, dabīgie izolācijas materiāli",
      installationTime: "2 nedēļas"
    },
    price: "€49,900",
    imageUrl: "https://images.unsplash.com/photo-1704307023984-813727deade9?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "eko-office",
    name: "EKO Office – Biroja moduļa māja",
    featured: false,
    details: {
      area: "35m²",
      materials: "Koka karkass, skaņu izolācija, ergonomisks dizains",
      installationTime: "1-2 nedēļas"
    },
    price: "€39,700",
    imageUrl: "https://plus.unsplash.com/premium_photo-1687402901004-91e2ac2f4d03?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "eko-lux",
    name: "EKO Lux – Premium moduļu māja",
    featured: false,
    details: {
      area: "75m²",
      materials: "Premium apdare, viedās mājas tehnoloģijas",
      installationTime: "3 nedēļas"
    },
    price: "€84,500",
    imageUrl: "https://plus.unsplash.com/premium_photo-1687710306880-95c72d9a19c5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const ProductsSection = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center">Mūsu Produkti</SectionTitle>
        
        <p className="text-lg text-center max-w-3xl mx-auto mb-12">
          Mēs piedāvājam plašu moduļu māju klāstu, kas pielāgotas dažādām vajadzībām. 
          Visiem mūsu produktiem ir augsti kvalitātes un ilgtspējas standarti.
        </p>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Featured product */}
          {products.filter(p => p.featured).map((product) => (
            <motion.div 
              key={product.id}
              className="col-span-full lg:col-span-2"
              variants={itemVariants}
            >
              <ProductCard product={product} isFeatured={true} />
            </motion.div>
          ))}
          
          {/* Other products */}
          {products.filter(p => !p.featured).map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} isFeatured={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
