import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProductDetails {
  area: string;
  materials: string;
  installationTime: string;
  energyEfficiency?: string;
  mobility?: string;
}

interface ProductProps {
  id: string;
  name: string;
  details: ProductDetails;
  price: string;
  imageUrl: string;
  featured: boolean;
}

interface ProductCardProps {
  product: ProductProps;
  isFeatured: boolean;
}

const ProductCard = ({ product, isFeatured }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full bg-white">
      <div className="relative group">
        <div className="overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={`w-full object-cover transition duration-500 group-hover:scale-105 ${isFeatured ? 'h-80' : 'h-60'}`}
          />
        </div>
        
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            Populārākais
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-heading font-bold mb-3`}>
          {product.name}
        </h3>
        
        {isFeatured ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-heading font-semibold text-lg">Platība</h4>
              <p>{product.details.area}</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg">Materiāli</h4>
              <p>{product.details.materials}</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg">Uzstādīšanas laiks</h4>
              <p>{product.details.installationTime}</p>
            </div>
            {product.details.energyEfficiency && (
              <div>
                <h4 className="font-heading font-semibold text-lg">Energoefektivitāte</h4>
                <p>{product.details.energyEfficiency}</p>
              </div>
            )}
            {product.details.mobility && (
              <div className="col-span-2">
                <h4 className="font-heading font-semibold text-lg">Mobilitāte</h4>
                <p>{product.details.mobility}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            <p><span className="font-semibold">Platība:</span> {product.details.area}</p>
            <p><span className="font-semibold">Materiāli:</span> {product.details.materials}</p>
            <p><span className="font-semibold">Uzstādīšanas laiks:</span> {product.details.installationTime}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-heading font-bold text-primary`}>{product.price}</div>
          {isFeatured ? (
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <a href="#contact">{product.id === "eko-mini" ? "Uzzināt vairāk" : "Pieprasīt piedāvājumu"}</a>
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ y: -2 }}>
              <a href="#contact" className="text-primary font-medium hover:underline">
                Uzzināt vairāk
              </a>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
