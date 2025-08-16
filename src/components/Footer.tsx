import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Clock, MapPin, Twitter, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const email = "imnikhil10@outlook.com";

  const currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleGetInTouch = () => {
    window.open(`mailto:${email}?subject=Let's Work Together - Project Inquiry&body=Hi Nikhil,%0D%0A%0D%0AI'd like to discuss a potential project with you.%0D%0A%0D%0ABest regards,`, '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-muted/30 py-16 px-4 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div 
          className={`backdrop-blur-lg bg-white/5 dark:bg-black/10 border border-white/10 rounded-3xl p-8 transition-all duration-500 ${
            isHovered ? 'transform scale-[1.02] shadow-2xl shadow-primary/20' : 'shadow-xl'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src="/lovable-uploads/209a2e34-b533-4448-a499-e64d4c9cdf98.png"
                  alt="Nikhil Sharma"
                  className="relative w-20 h-20 object-cover rounded-full border-2 border-white/20"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Let's work together!</h3>
                <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Center Decorative Element */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-400 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-background rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-end">
              <Button
                size="lg"
                onClick={handleGetInTouch}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-400/50 rounded-xl px-8 py-3 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
          {/* About */}
          <div className="space-y-2">
            <p className="text-foreground font-medium">SEO Expert | Dynamic Lead</p>
            <p>
              Passionate about driving organic growth through data-driven SEO strategies. 
              Dedicated to helping brands achieve visibility and revenue growth.
            </p>
          </div>

          {/* Time & Version */}
          <div className="space-y-4">
            <div>
              <h4 className="text-foreground font-medium mb-2">Version</h4>
              <p>2025 © Edition</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Timezone</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{currentTime} IST (GMT+5:30)</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-foreground font-medium mb-4">Socials</h4>
            <div className="flex gap-4">
              <a 
                href="https://x.com/imnikhill10" 
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all hover:scale-110 transform duration-200 group"
              >
                <Twitter className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Twitter</span>
              </a>
              <a 
                href="https://github.com/nikhilsearch" 
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all hover:scale-110 transform duration-200 group"
              >
                <Github className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Github</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/nikhil-sharma10/" 
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all hover:scale-110 transform duration-200 group"
              >
                <Linkedin className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;