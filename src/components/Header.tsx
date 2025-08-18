import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const navigationItems = [
    { name: "About Me", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Success Stories", href: "#stories", id: "stories" },
    { name: "Blog", href: "/blog", id: "blog", isRoute: true },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  // Smooth scroll function
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  // Handle Get Free Audit button click
  const handleGetFreeAudit = () => {
    setIsContactFormOpen(true);
    setIsMenuOpen(false);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.querySelector(item.href));
      const scrollY = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Nikhil Sharma
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const isActive = item.isRoute ? location.pathname.startsWith(item.href) : activeSection === item.id;
              
              return item.isRoute ? (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`transition-all duration-300 hover:text-primary font-medium ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`transition-all duration-300 hover:text-primary font-medium ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button
              onClick={handleGetFreeAudit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Get Free Audit
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border/40">
              {navigationItems.map((item) => {
                const isActive = item.isRoute ? location.pathname.startsWith(item.href) : activeSection === item.id;
                
                return item.isRoute ? (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
              <div className="pt-4">
                <Button
                  onClick={handleGetFreeAudit}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 justify-center"
                >
                  <Eye className="w-4 h-4" />
                  Get Free Audit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onOpenChange={setIsContactFormOpen} 
      />
    </header>
  );
};

export default Header;