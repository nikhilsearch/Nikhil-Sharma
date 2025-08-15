import { Card } from "@/components/ui/card";
import { Search, BarChart3, Tag, Bug, Link, TrendingUp, Moon, Lightbulb, Crown, PieChart, FileSpreadsheet, MessageSquare, Brain, Zap, Sparkles, Gem } from "lucide-react";
import { useEffect, useState } from "react";

const ToolsMindMap = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tools = [
    // SEO Tools
    { name: "Google Search Console", icon: Search, category: "SEO" },
    { name: "Google Analytics", icon: BarChart3, category: "SEO" },
    { name: "Google Tag Manager", icon: Tag, category: "SEO" },
    { name: "Screaming Frog", icon: Bug, category: "SEO" },
    { name: "Ahrefs", icon: Link, category: "SEO" },
    { name: "Semrush", icon: TrendingUp, category: "SEO" },
    { name: "Lumar", icon: Moon, category: "SEO" },
    { name: "Sitebulb", icon: Lightbulb, category: "SEO" },
    { name: "Moz", icon: Crown, category: "SEO" },
    
    // Analytics & Data
    { name: "Looker Studio", icon: PieChart, category: "Analytics" },
    { name: "Google Sheets", icon: FileSpreadsheet, category: "Analytics" },
    
    // AI Tools
    { name: "ChatGPT", icon: MessageSquare, category: "AI" },
    { name: "Claude", icon: Brain, category: "AI" },
    { name: "Perplexity", icon: Zap, category: "AI" },
    { name: "Gemini", icon: Sparkles, category: "AI" },
    { name: "Jules", icon: Gem, category: "AI" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SEO": return "from-blue-500 to-cyan-500";
      case "Analytics": return "from-green-500 to-emerald-500";
      case "AI": return "from-purple-500 to-pink-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  // Animated particles component
  const AnimatedParticles = () => (
    <>
      {/* Floating orange dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-bounce" 
           style={{animationDelay: '0s', animationDuration: '3s'}} />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-40 animate-pulse" 
           style={{animationDelay: '1s', animationDuration: '4s'}} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-orange-300 rounded-full opacity-50 animate-ping" 
           style={{animationDelay: '2s', animationDuration: '5s'}} />
      <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-orange-400 rounded-full opacity-30 animate-bounce" 
           style={{animationDelay: '1.5s', animationDuration: '3.5s'}} />
      
      {/* Geometric wireframes */}
      <svg className="absolute inset-0 w-full h-full opacity-10" style={{pointerEvents: 'none'}}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated lines */}
        <path d="M 100 100 L 300 200 L 500 150 L 700 250" 
              fill="none" 
              stroke="orange" 
              strokeWidth="1" 
              opacity="0.2"
              className="animate-pulse" />
        <path d="M 200 300 Q 400 100 600 300 T 1000 300" 
              fill="none" 
              stroke="orange" 
              strokeWidth="0.8" 
              opacity="0.15"
              className="animate-pulse" 
              style={{animationDelay: '1s'}} />
        
        {/* Floating geometric shapes */}
        <circle cx="150" cy="200" r="30" fill="none" stroke="orange" strokeWidth="0.5" opacity="0.1" 
                className="animate-spin" style={{animationDuration: '20s'}} />
        <rect x="600" y="100" width="40" height="40" fill="none" stroke="orange" strokeWidth="0.5" opacity="0.1" 
              transform="rotate(45 620 120)" className="animate-spin" style={{animationDuration: '15s'}} />
      </svg>

      {/* Mouse follow effect */}
      <div 
        className="absolute w-32 h-32 bg-orange-400/5 rounded-full blur-xl transition-all duration-300 pointer-events-none"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );

  return (
    <section className="relative w-full py-12 md:py-20 px-4 bg-gradient-to-b from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Animated background elements */}
      <AnimatedParticles />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
              Professional Tools
            </span>{" "}
            & Technologies
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of the tools and technologies I use professionally across SEO, analytics, and AI
          </p>
        </header>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div 
                key={tool.name} 
                className="group relative bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Icon container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(tool.category)} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                {/* Tool name */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {tool.name}
                </h3>
                
                {/* Category description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tool.category === "SEO" && "Search optimization & technical analysis tool"}
                  {tool.category === "Analytics" && "Data visualization & reporting platform"}
                  {tool.category === "AI" && "Artificial intelligence & automation assistant"}
                </p>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(tool.category)} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 rounded-2xl`} />
                
                {/* Card border glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;