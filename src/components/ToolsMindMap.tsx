import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const tools = [
    // SEO Tools
    { name: "Google Search Console", icon: "🔍", category: "SEO" },
    { name: "Google Analytics", icon: "📊", category: "SEO" },
    { name: "Google Tag Manager", icon: "🏷️", category: "SEO" },
    { name: "Screaming Frog", icon: "🐸", category: "SEO" },
    { name: "Ahrefs", icon: "🔗", category: "SEO" },
    { name: "Semrush", icon: "📈", category: "SEO" },
    { name: "Lumar", icon: "🌙", category: "SEO" },
    { name: "Sitebulb", icon: "💡", category: "SEO" },
    { name: "Moz", icon: "🦁", category: "SEO" },
    
    // Analytics & Data
    { name: "Looker Studio", icon: "📊", category: "Analytics" },
    { name: "Google Sheets", icon: "📝", category: "Analytics" },
    
    // AI Tools
    { name: "ChatGPT", icon: "🤖", category: "AI" },
    { name: "Claude", icon: "🧠", category: "AI" },
    { name: "Perplexity", icon: "🔎", category: "AI" },
    { name: "Gemini", icon: "✨", category: "AI" },
    { name: "Jules", icon: "💎", category: "AI" }
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

        {/* Tools by Category */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{category.tools.length}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {category.tools.map((tool) => (
                  <Card 
                    key={tool.name} 
                    className="group relative p-6 bg-card hover:bg-card/80 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
                    
                    <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl text-white">{tool.icon}</span>
                      </div>
                      
                      {/* Tool name */}
                      <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-300">
                        {tool.name}
                      </h4>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="p-6 bg-card/50 backdrop-blur-sm border border-border/30 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl text-white font-bold">{category.tools.length}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{category.name} Tools</h3>
              <p className="text-muted-foreground text-sm">
                {category.name === "SEO" && "Search optimization & technical analysis"}
                {category.name === "Analytics" && "Data visualization & reporting"}
                {category.name === "AI" && "Artificial intelligence & automation"}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;