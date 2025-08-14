import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ToolsMindMap = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    { name: "Google Analytics", icon: "📊", color: "from-orange-500 to-orange-600", description: "Web analytics and performance tracking" },
    { name: "Google Search Console", icon: "🔍", color: "from-blue-500 to-blue-600", description: "Search performance monitoring" },
    { name: "SEMrush", icon: "🎯", color: "from-orange-600 to-red-600", description: "SEO and competitive analysis" },
    { name: "Ahrefs", icon: "📈", color: "from-orange-500 to-orange-600", description: "Backlink analysis and keyword research" },
    { name: "Moz", icon: "🔗", color: "from-blue-500 to-blue-600", description: "SEO tools and domain authority tracking" },
    { name: "Screaming Frog", icon: "🐸", color: "from-green-500 to-green-600", description: "Website crawling and technical SEO" },
    { name: "WordPress", icon: "📝", color: "from-blue-500 to-blue-600", description: "Content management system" },
    { name: "HubSpot", icon: "🚀", color: "from-orange-500 to-orange-600", description: "Marketing automation platform" },
    { name: "Power BI", icon: "📊", color: "from-yellow-500 to-yellow-600", description: "Business intelligence and data visualization" },
    { name: "ChatGPT", icon: "🤖", color: "from-green-500 to-green-600", description: "AI-powered content and strategy assistance" },
    { name: "Gemini", icon: "✨", color: "from-blue-500 to-blue-600", description: "Google's AI assistant for marketing" },
    { name: "Claude", icon: "🧠", color: "from-orange-500 to-orange-600", description: "AI assistant for content optimization" },
    { name: "Canva", icon: "🎨", color: "from-blue-400 to-blue-500", description: "Design and visual content creation" },
    { name: "Looker Studio", icon: "📈", color: "from-blue-500 to-blue-600", description: "Data visualization and reporting" },
    { name: "Lovable", icon: "💜", color: "from-purple-500 to-purple-600", description: "AI-powered web development" }
  ];

  const centerTool = { name: "SEO Tools", icon: "🎯", color: "from-primary to-purple-400" };

  const getPosition = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const radius = 200;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Tools</span>{" "}
            <span className="text-foreground">I Use</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging the best tools in the industry to deliver exceptional results and insights for every project.
          </p>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Central Hub */}
          <div className="absolute z-10">
            <Card className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-primary to-purple-400 border-0 shadow-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">{centerTool.icon}</div>
                <div className="text-sm font-semibold text-white">{centerTool.name}</div>
              </div>
            </Card>
          </div>

          {/* Tool Nodes */}
          {tools.map((tool, index) => {
            const position = getPosition(index, tools.length);
            const isSelected = selectedTool === tool.name;
            
            return (
              <div key={tool.name}>
                {/* Connection Line */}
                <svg 
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%)`,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={position.x}
                    y2={position.y}
                    stroke="hsl(263 70% 50%)"
                    strokeWidth={isSelected ? "3" : "1"}
                    strokeOpacity={isSelected ? "0.8" : "0.3"}
                    className="transition-all duration-300"
                  />
                </svg>

                {/* Tool Card */}
                <Card
                  className={`absolute w-20 h-20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 border-2 ${
                    isSelected 
                      ? 'border-primary shadow-lg shadow-primary/25 scale-110' 
                      : 'border-border/30 hover:border-primary/50'
                  }`}
                  style={{
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                    left: '50%',
                    top: '50%'
                  }}
                  onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <div className="text-xs font-medium text-center leading-tight">
                      {tool.name.split(' ').map((word, i) => (
                        <div key={i}>{word}</div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Tool Description */}
        {selectedTool && (
          <div className="mt-8 text-center">
            <Card className="max-w-md mx-auto p-6 bg-card/80 backdrop-blur-sm border-primary/30">
              <h3 className="text-xl font-semibold mb-2 text-primary">{selectedTool}</h3>
              <p className="text-muted-foreground">
                {tools.find(tool => tool.name === selectedTool)?.description}
              </p>
            </Card>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            <span className="font-semibold">Always Learning, Always Growing</span>
          </p>
          <p className="text-muted-foreground">
            I stay up-to-date with the latest tools and technologies to ensure I'm always delivering cutting-edge solutions for my clients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;