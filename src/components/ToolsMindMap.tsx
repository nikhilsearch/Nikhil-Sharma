import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Search, 
  Target, 
  TrendingUp, 
  Link, 
  Bug, 
  FileText, 
  Rocket, 
  PieChart, 
  Bot, 
  Sparkles, 
  Brain, 
  Palette, 
  BarChart2, 
  Heart,
  Tag,
  ArrowRight
} from "lucide-react";

const ToolsMindMap = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const centralNode = {
    name: "SEO Growth Strategy",
    description: "Comprehensive approach to organic growth"
  };

  const stepNodes = [
    {
      id: "step1",
      name: "Step 1: Technical Foundation",
      description: "Site optimization and performance",
      tools: ["Google Search Console", "Screaming Frog", "GTM"]
    },
    {
      id: "step2", 
      name: "Step 2: Keyword Research",
      description: "Strategic keyword analysis",
      tools: ["SEMrush", "Ahrefs", "Google Keyword Planner"]
    },
    {
      id: "step3",
      name: "Step 3: Content Optimization", 
      description: "Content creation and optimization",
      tools: ["WordPress", "Canva", "ChatGPT"]
    },
    {
      id: "action",
      name: "Action Plan: Analytics & Tracking",
      description: "Performance monitoring and reporting",
      tools: ["Google Analytics", "Looker Studio", "Power BI"]
    }
  ];

  const strategyNodes = [
    {
      id: "targeted",
      name: "Targeted Approach",
      description: "Focus on high-impact opportunities"
    },
    {
      id: "helpful", 
      name: "Be Genuinely Helpful",
      description: "Create valuable user experiences"
    },
    {
      id: "shareable",
      name: "Create Shareable Tools", 
      description: "Build resources that attract links"
    },
    {
      id: "partner",
      name: "Partner with Others",
      description: "Collaborate for mutual growth"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My SEO</span>{" "}
            <span className="text-white">Process</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A strategic approach to SEO that drives sustainable organic growth through proven methodologies
          </p>
        </div>

        <div className="relative h-[600px] flex items-center">
          {/* SVG for curved connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Central to steps connections */}
            {stepNodes.map((step, index) => {
              const startX = 280;
              const startY = 300;
              const endX = 650;
              const endY = 120 + (index * 100);
              
              const controlX1 = startX + 100;
              const controlY1 = startY;
              const controlX2 = endX - 100;
              const controlY2 = endY;

              return (
                <path
                  key={step.id}
                  d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                  stroke="rgba(148, 163, 184, 0.4)"
                  strokeWidth={hoveredNode === step.id ? "3" : "2"}
                  fill="none"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Steps to strategy connections */}
            {strategyNodes.map((strategy, index) => {
              const startX = 900;
              const startY = 120 + (Math.floor(index / 2) * 200);
              const endX = 1150;
              const endY = 150 + (index * 80);
              
              const controlX1 = startX + 80;
              const controlY1 = startY;
              const controlX2 = endX - 80;
              const controlY2 = endY;

              return (
                <path
                  key={strategy.id}
                  d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                  stroke="rgba(34, 197, 94, 0.4)"
                  strokeWidth={hoveredNode === strategy.id ? "3" : "2"}
                  fill="none"
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Central Node */}
          <div 
            className="absolute left-[50px] top-1/2 transform -translate-y-1/2 z-10"
            onMouseEnter={() => setHoveredNode("central")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <Card className="w-[200px] p-4 bg-slate-700/80 backdrop-blur-md border border-slate-600 hover:border-blue-400 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-semibold text-white mb-1">{centralNode.name}</h3>
                <p className="text-xs text-slate-300">{centralNode.description}</p>
              </div>
            </Card>
          </div>

          {/* Step Nodes */}
          {stepNodes.map((step, index) => (
            <div
              key={step.id}
              className="absolute z-10"
              style={{
                left: `${600}px`,
                top: `${70 + (index * 100)}px`
              }}
              onMouseEnter={() => setHoveredNode(step.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <Card className={`w-[250px] p-4 bg-slate-700/80 backdrop-blur-md border border-slate-600 hover:border-blue-400 transition-all duration-300 cursor-pointer ${
                hoveredNode === step.id ? 'scale-105 border-blue-400' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{step.name}</h3>
                    <p className="text-xs text-slate-300 mb-2">{step.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {step.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="text-[10px] px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}

          {/* Strategy Nodes */}
          {strategyNodes.map((strategy, index) => (
            <div
              key={strategy.id}
              className="absolute z-10"
              style={{
                left: `${1100}px`,
                top: `${100 + (index * 80)}px`
              }}
              onMouseEnter={() => setHoveredNode(strategy.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <Card className={`w-[200px] p-3 bg-green-900/30 backdrop-blur-md border border-green-600/50 hover:border-green-400 transition-all duration-300 cursor-pointer ${
                hoveredNode === strategy.id ? 'scale-105 border-green-400' : ''
              }`}>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{strategy.name}</h3>
                    <p className="text-xs text-green-100">{strategy.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom description */}
        <div className="text-center mt-12">
          <p className="text-lg text-slate-300 mb-4">
            <span className="font-semibold text-blue-400">Strategic SEO Implementation</span>
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Every project follows this proven framework, ensuring consistent results and sustainable growth through data-driven decision making.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;