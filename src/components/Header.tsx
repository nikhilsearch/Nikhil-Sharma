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
            <div className="relative px-4 pt-4 pb-6 space-y-3 bg-gradient-to-br from-background/95 to-muted/30 
              backdrop-blur-xl border-t border-border/40 animate-fade-in">
              
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 
                opacity-0 animate-fade-in animation-delay-100" />
              
              {/* Navigation Items */}
              <div className="relative space-y-2">
                {navigationItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.href)}
                      className={`group relative block w-full text-left px-6 py-4 rounded-2xl text-base font-medium 
                        transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]
                        transform-gpu will-change-transform animate-fade-in bg-gradient-to-r from-muted/40 to-muted/20
                        backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-xl
                        ${isActive
                          ? "text-primary bg-gradient-to-r from-primary/20 to-purple-500/10 border-primary/50 shadow-lg shadow-primary/20"
                          : "text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/5"
                        }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-purple-500/0 
                        opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b 
                          from-primary to-purple-500 rounded-full animate-scale-in" />
                      )}
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                        bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform 
                        duration-1000 ease-out rounded-2xl" />
                    </button>
                  );
                })}
              </div>
              
              {/* Enhanced Mobile Social Links */}
              <div className="pt-6 pb-2">
                <h3 className="text-sm font-semibold text-muted-foreground mb-6 px-3 text-center 
                  bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent animate-fade-in"
                  style={{ animationDelay: '500ms' }}>
                  Connect With Me
                </h3>
                
                <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative p-4 rounded-2xl bg-gradient-to-br from-muted/60 to-muted/30 
                          backdrop-blur-xl border border-border/40 transition-all duration-700 ease-out 
                          hover:scale-125 active:scale-95 hover:-translate-y-3 hover:rotate-12 
                          ${social.color} ${social.bgGlow} ${social.bgColor} hover:border-current/50 
                          hover:shadow-2xl transform-gpu will-change-transform animate-scale-in`}
                        aria-label={`Connect on ${social.name}`}
                        onClick={() => setIsMenuOpen(false)}
                        style={{ animationDelay: `${700 + index * 100}ms` }}
                      >
                        <Icon className="w-6 h-6 transition-all duration-500 group-hover:scale-125 
                          group-hover:rotate-12 transform-gpu" />
                        
                        {/* Multi-layer gradient overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-current/0 to-current/0 
                          group-hover:from-current/15 group-hover:to-current/25 transition-all duration-500" />
                        
                        {/* Animated border gradient */}
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-transparent 
                          via-current/30 to-transparent opacity-0 group-hover:opacity-100 transition-all 
                          duration-700 -z-10 blur-sm animate-pulse" />
                        
                        {/* Ripple effect */}
                        <div className="absolute inset-0 rounded-2xl bg-current/10 scale-0 group-active:scale-150 
                          transition-transform duration-300 ease-out" />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 left-4 w-12 h-0.5 bg-gradient-to-r from-primary to-purple-500 
                rounded-full animate-fade-in" style={{ animationDelay: '200ms' }} />
              <div className="absolute top-2 right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 
                rounded-full animate-fade-in" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;