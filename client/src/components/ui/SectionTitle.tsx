import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <h2 
      className={cn(
        "text-3xl md:text-4xl font-heading font-bold mb-8 relative inline-block",
        className
      )}
    >
      {children}
      <span className="absolute left-0 bottom-[-8px] h-1 w-20 bg-primary"></span>
    </h2>
  );
};

export default SectionTitle;
