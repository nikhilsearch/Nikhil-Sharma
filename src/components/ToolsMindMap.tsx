import { Card } from "@/components/ui/card";
import { Search, BarChart3, Tag, Bug, Link, TrendingUp, Moon, Lightbulb, Crown, PieChart, FileSpreadsheet, MessageSquare, Brain, Zap, Sparkles, Gem } from "lucide-react";

const ToolsMindMap = () => {
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

  const categories = [
    { name: "SEO", tools: tools.filter(tool => tool.category === "SEO"), color: "from-blue-500 to-cyan-500" },
    { name: "Analytics", tools: tools.filter(tool => tool.category === "Analytics"), color: "from-green-500 to-emerald-500" },
    { name: "AI", tools: tools.filter(tool => tool.category === "AI"), color: "from-purple-500 to-pink-500" }
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 bg-gradient-to-b from-background via-background/95 to-muted/20">
      <div className="max-w-7xl mx-auto">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.name} 
                className="group relative p-6 bg-card hover:bg-card/80 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(tool.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(tool.category)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Tool name */}
                  <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-300">
                    {tool.name}
                  </h4>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;