import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoSvg from "@/assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img src={logoSvg} alt="EKO-MĀJA Logo" className="h-10" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="font-medium text-neutral-800 hover:text-primary transition duration-300">Sākums</a>
            <a href="#about" className="font-medium text-neutral-800 hover:text-primary transition duration-300">Par mums</a>
            <a href="#products" className="font-medium text-neutral-800 hover:text-primary transition duration-300">Produkti</a>
            <a href="#faq" className="font-medium text-neutral-800 hover:text-primary transition duration-300">BUJ</a>
            <a href="#contact" className="font-medium text-neutral-800 hover:text-primary transition duration-300">Kontakti</a>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary hover:bg-primary/10 hover:text-primary"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
              <a href="#home" onClick={closeMenu} className="block py-2 px-4 font-medium hover:bg-primary hover:text-white rounded transition duration-300">Sākums</a>
              <a href="#about" onClick={closeMenu} className="block py-2 px-4 font-medium hover:bg-primary hover:text-white rounded transition duration-300">Par mums</a>
              <a href="#products" onClick={closeMenu} className="block py-2 px-4 font-medium hover:bg-primary hover:text-white rounded transition duration-300">Produkti</a>
              <a href="#faq" onClick={closeMenu} className="block py-2 px-4 font-medium hover:bg-primary hover:text-white rounded transition duration-300">BUJ</a>
              <a href="#contact" onClick={closeMenu} className="block py-2 px-4 font-medium hover:bg-primary hover:text-white rounded transition duration-300">Kontakti</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
