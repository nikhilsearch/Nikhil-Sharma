import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Github, Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { toast } = useToast();
  const location = useLocation();

  const navigationItems = [
    { name: "About Me", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Success Stories", href: "#case-studies", id: "case-studies" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/nikhilsharma",
      color: "hover:text-purple-400",
      bgGlow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]",
      bgColor: "hover:bg-purple-500/10"
    },
    {
      name: "LinkedIn", 
      icon: Linkedin,
      href: "https://linkedin.com/in/nikhilsharma",
      color: "hover:text-blue-400",
      bgGlow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
      bgColor: "hover:bg-blue-500/10"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/nikhilsharma", 
      color: "hover:text-sky-400",
      bgGlow: "hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]",
      bgColor: "hover:bg-sky-500/10"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/your-number",
      color: "hover:text-green-400",
      bgGlow: "hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]",
      bgColor: "hover:bg-green-500/10"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:imnikhil10@outlook.com?subject=Let's discuss your project&body=Hi Nikhil,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0ABest regards",
      color: "hover:text-orange-400",
      bgGlow: "hover:shadow-[0_0_25px_rgba(251,146,60,0.6)]",
      bgColor: "hover:bg-orange-500/10"
    }
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

  // Handle Get in Touch button click
  const handleGetInTouch = () => {
    window.location.href = "mailto:imnikhil10@outlook.com?subject=Let's discuss your project&body=Hi Nikhil,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0ABest regards";
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
              const isActive = activeSection === item.id;
              
              return (
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

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/60 backdrop-blur-lg 
                    border border-border/30 transition-all duration-700 ease-out hover:scale-125 hover:rotate-12 
                    hover:-translate-y-2 active:scale-110 ${social.color} ${social.bgGlow} ${social.bgColor}
                    hover:border-current/50 hover:shadow-2xl transform-gpu will-change-transform`}
                  aria-label={`Connect on ${social.name}`}
                >
                  <Icon className="w-5 h-5 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 transform-gpu" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-current/0 to-current/0 
                    group-hover:from-current/5 group-hover:to-current/15 transition-all duration-500" />
                  
                  {/* Animated border gradient */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-transparent via-current/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                </a>
              );
            })}
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
                const isActive = activeSection === item.id;
                
                return (
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
              
              {/* Mobile Social Links */}
              <div className="pt-4 pb-4">
                <p className="text-sm font-medium text-muted-foreground mb-4 px-3 text-center">Connect With Me</p>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative p-4 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/60 
                          backdrop-blur-lg border border-border/30 transition-all duration-700 ease-out 
                          hover:scale-110 active:scale-95 hover:-translate-y-2 ${social.color} ${social.bgGlow} 
                          ${social.bgColor} hover:border-current/50 hover:shadow-xl transform-gpu will-change-transform`}
                        aria-label={`Connect on ${social.name}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-7 h-7 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 transform-gpu" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-current/0 to-current/0 
                          group-hover:from-current/10 group-hover:to-current/20 transition-all duration-500" />
                        
                        {/* Animated pulse effect */}
                        <div className="absolute -inset-1 rounded-2xl bg-current/20 opacity-0 group-hover:opacity-50 
                          transition-all duration-700 animate-pulse blur-sm" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;