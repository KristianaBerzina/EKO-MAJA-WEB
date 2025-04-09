import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ContactInfo from "@/components/ui/ContactInfo";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Extend the schema to add more validation
const formSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(2, "Vārds ir pārāk īss").max(100),
  phone: z.string().min(8, "Telefona numurs ir pārāk īss"),
  email: z.string().email("Lūdzu ievadiet derīgu e-pasta adresi"),
  message: z.string().min(10, "Lūdzu ievadiet vismaz 10 simbolus"),
  privacy: z.boolean().refine(val => val === true, {
    message: "Jums jāpiekrīt privātuma politikai",
  }),
});

// Add the privacy field that's not part of the database schema
type FormValues = z.infer<typeof formSchema>;

const productOptions = [
  { id: "eko-mini", label: "EKO Mini – Kompakta moduļu māja" },
  { id: "eko-standard", label: "EKO Standard – Ģimenes moduļu māja" },
  { id: "eko-office", label: "EKO Office – Biroja moduļa māja" },
  { id: "eko-lux", label: "EKO Lux – Premium moduļu māja" },
  { id: "custom", label: "Cits / Pielāgots risinājums" },
];

const ContactSection = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      product: "",
      message: "",
      privacy: false,
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: Omit<FormValues, 'privacy'>) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: async () => {
      toast({
        title: "Paldies!",
        description: "Jūsu ziņojums ir nosūtīts. Mēs ar jums sazināsimies pēc iespējas ātrāk.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Kļūda!",
        description: "Neizdevās nosūtīt ziņojumu. Lūdzu, mēģiniet vēlreiz.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    },
  });

  function onSubmit(data: FormValues) {
    // Remove the privacy field as it's not part of our database schema
    const { privacy, ...submissionData } = data;
    submitMutation.mutate(submissionData);
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle className="text-center">Sazinies ar mums</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-6">Atstāj ziņu</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vārds, Uzvārds *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Jānis Bērziņš" 
                            {...field}
                            disabled={submitMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefona numurs *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+371 20000000" 
                            {...field}
                            disabled={submitMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-pasta adrese *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="janis@example.com" 
                          type="email"
                          {...field}
                          disabled={submitMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interesējošais produkts</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={submitMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Izvēlieties produktu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jūsu ziņojums *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Lūdzu, pastāstiet mums vairāk par jūsu vajadzībām..." 
                          rows={4}
                          {...field}
                          disabled={submitMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={submitMutation.isPending}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Piekrītu personas datu apstrādei saskaņā ar {" "}
                          <a href="#" className="text-primary hover:underline">
                            privātuma politiku
                          </a> *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Nosūta..." : "Nosūtīt pieprasījumu"}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
