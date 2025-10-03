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
    { name: "Blog", href: "/blog", id: "blog", isRoute: true, openInNewTab: true },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:imnikhil10@outlook.com?subject=Let's discuss your project&body=Hi Nikhil,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0ABest regards",
      color: "hover:text-[#EA4335]",
      bgGlow: "hover:shadow-[0_0_25px_rgba(234,67,53,0.6)]",
      bgColor: "hover:bg-[#EA4335]/10",
      brandColor: "#EA4335"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/919680514780",
      color: "hover:text-[#25D366]",
      bgGlow: "hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]",
      bgColor: "hover:bg-[#25D366]/10",
      brandColor: "#25D366"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/nikhilsearch",
      color: "hover:text-[#333333] dark:hover:text-[#f0f6fe]",
      bgGlow: "hover:shadow-[0_0_25px_rgba(51,51,51,0.6)] dark:hover:shadow-[0_0_25px_rgba(240,246,254,0.6)]",
      bgColor: "hover:bg-[#333333]/10 dark:hover:bg-[#f0f6fe]/10",
      brandColor: "#333333"
    }
  ];

  // Smooth scroll function
  const scrollToSection = (href: string, isRoute?: boolean, openInNewTab?: boolean) => {
    if (openInNewTab) {
      // Open in new tab
      window.open(href, '_blank');
    } else if (isRoute) {
      // Navigate to route
      window.location.href = href;
    } else {
      // Scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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
      // Filter out route items, only track hash sections
      const sectionItems = navigationItems.filter(item => !item.isRoute && item.href.startsWith('#'));
      const sections = sectionItems.map(item => document.querySelector(item.href));
      const scrollY = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(sectionItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pr-6 sm:pr-8 lg:pr-12">
        <div className="flex justify-between items-center h-18">
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
              
              // Use anchor tag for blog link for SEO crawlability
              if (item.id === 'blog') {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 hover:text-primary font-medium ${
                      isActive
                        ? "text-primary border-b-2 border-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              }
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href, item.isRoute)}
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
            <div className="relative px-3 pt-3 pb-5 space-y-2 bg-gradient-to-br from-background/98 to-background/95 
              backdrop-blur-2xl border-t border-border/20 animate-fade-in">
              
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-purple-500/2 opacity-50" />
              
              {/* Navigation Items */}
              <div className="relative space-y-1.5">
                {navigationItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  
                  // Use anchor tag for blog link for SEO crawlability
                  if (item.id === 'blog') {
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative block w-full text-left px-4 py-3.5 rounded-xl text-base font-medium 
                          transition-all duration-300 ease-out hover:scale-[1.01] active:scale-[0.99]
                          transform-gpu will-change-transform animate-fade-in
                          ${isActive
                            ? "text-primary bg-gradient-to-r from-primary/8 to-primary/4 border border-primary/20 shadow-sm"
                            : "text-foreground hover:text-primary hover:bg-muted/60 border border-transparent hover:border-border/30"
                          }`}
                        style={{ animationDelay: `${index * 80}ms` }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {/* Active indicator line */}
                        {isActive && (
                          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b 
                            from-primary to-primary/60 rounded-full animate-scale-in" />
                        )}
                        
                        <span className="relative z-10 ml-2">{item.name}</span>
                        
                        {/* Subtle hover gradient */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 
                          group-hover:from-primary/5 group-hover:to-primary/2 transition-all duration-300" />
                      </a>
                    );
                  }
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.href, item.isRoute)}
                      className={`group relative block w-full text-left px-4 py-3.5 rounded-xl text-base font-medium 
                        transition-all duration-300 ease-out hover:scale-[1.01] active:scale-[0.99]
                        transform-gpu will-change-transform animate-fade-in
                        ${isActive
                          ? "text-primary bg-gradient-to-r from-primary/8 to-primary/4 border border-primary/20 shadow-sm"
                          : "text-foreground hover:text-primary hover:bg-muted/60 border border-transparent hover:border-border/30"
                        }`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {/* Active indicator line */}
                      {isActive && (
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b 
                          from-primary to-primary/60 rounded-full animate-scale-in" />
                      )}
                      
                      <span className="relative z-10 ml-2">{item.name}</span>
                      
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 
                        group-hover:from-primary/5 group-hover:to-primary/2 transition-all duration-300" />
                    </button>
                  );
                })}
              </div>
              
              {/* Divider */}
              <div className="py-2">
                <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
              </div>
              
              {/* Enhanced Mobile Social Links */}
              <div className="pt-3 pb-1">
                <h3 className="text-xs font-medium text-muted-foreground/80 mb-4 px-2 text-center uppercase tracking-wider
                  animate-fade-in" style={{ animationDelay: '400ms' }}>
                  Connect With Me
                </h3>
                
                <div className="flex justify-center space-x-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative p-3 rounded-full bg-gradient-to-br from-muted/40 to-muted/20 
                          backdrop-blur-sm border border-border/20 transition-all duration-500 ease-out 
                          hover:scale-110 active:scale-95 hover:-translate-y-1 hover:rotate-3
                          ${social.color} hover:border-current/20 hover:shadow-lg transform-gpu will-change-transform 
                          animate-scale-in`}
                        aria-label={`Connect on ${social.name}`}
                        onClick={() => setIsMenuOpen(false)}
                        style={{ animationDelay: `${600 + index * 60}ms` }}
                      >
                        <Icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 transform-gpu" />
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-current/0 group-hover:bg-current/8 
                          transition-all duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r 
                from-primary/30 via-primary to-primary/30 rounded-t-full" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;