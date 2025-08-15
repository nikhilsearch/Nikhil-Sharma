import React, { useEffect, useRef, useState, useMemo } from 'react';
import { hierarchy, tree } from 'd3-hierarchy';
import { Search, BarChart3, Tag, Bug, Link, TrendingUp, Moon, Lightbulb, Crown, PieChart, FileSpreadsheet, MessageSquare, Brain, Zap, Sparkles, Gem } from "lucide-react";

interface ToolNode {
  name: string;
  icon: React.ComponentType<any>;
  category: string;
  children?: ToolNode[];
}

interface TreeNodeData {
  x: number;
  y: number;
  data: ToolNode;
  children?: TreeNodeData[];
  parent?: TreeNodeData;
  id: string;
}

const ToolsRadialTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [animationsPaused, setAnimationsPaused] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Tools data structured as a tree
  const toolsData: ToolNode = useMemo(() => ({
    name: "Professional Tools",
    icon: Sparkles,
    category: "root",
    children: [
      {
        name: "SEO Tools",
        icon: Search,
        category: "category",
        children: [
          { name: "Google Search Console", icon: Search, category: "SEO" },
          { name: "Google Analytics", icon: BarChart3, category: "SEO" },
          { name: "Google Tag Manager", icon: Tag, category: "SEO" },
          { name: "Screaming Frog", icon: Bug, category: "SEO" },
          { name: "Ahrefs", icon: Link, category: "SEO" },
          { name: "Semrush", icon: TrendingUp, category: "SEO" },
          { name: "Lumar", icon: Moon, category: "SEO" },
          { name: "Sitebulb", icon: Lightbulb, category: "SEO" },
          { name: "Moz", icon: Crown, category: "SEO" }
        ]
      },
      {
        name: "Analytics",
        icon: PieChart,
        category: "category",
        children: [
          { name: "Looker Studio", icon: PieChart, category: "Analytics" },
          { name: "Google Sheets", icon: FileSpreadsheet, category: "Analytics" }
        ]
      },
      {
        name: "AI Tools",
        icon: Brain,
        category: "category",
        children: [
          { name: "ChatGPT", icon: MessageSquare, category: "AI" },
          { name: "Claude", icon: Brain, category: "AI" },
          { name: "Perplexity", icon: Zap, category: "AI" },
          { name: "Gemini", icon: Sparkles, category: "AI" },
          { name: "Jules", icon: Gem, category: "AI" }
        ]
      }
    ]
  }), []);

  // Create tree layout
  const treeData = useMemo(() => {
    const root = hierarchy(toolsData);
    const treeLayout = tree<ToolNode>()
      .size([Math.min(dimensions.width, dimensions.height) * 0.8, Math.min(dimensions.width, dimensions.height) * 0.8])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
    
    return treeLayout(root);
  }, [toolsData, dimensions]);

  // Convert to nodes with unique IDs
  const nodes = useMemo(() => {
    const nodeList: TreeNodeData[] = [];
    const addNode = (node: any, parent?: TreeNodeData) => {
      const treeNode: TreeNodeData = {
        x: node.x + dimensions.width / 2,
        y: node.y + dimensions.height / 2,
        data: node.data,
        id: `${node.data.name}-${node.depth}`,
        parent
      };
      
      if (node.children) {
        treeNode.children = node.children.map((child: any) => addNode(child, treeNode));
      }
      
      nodeList.push(treeNode);
      return treeNode;
    };
    
    addNode(treeData);
    return nodeList;
  }, [treeData, dimensions]);

  // Get node colors
  const getNodeColor = (category: string) => {
    switch (category) {
      case "root": return { primary: "#8B5CF6", secondary: "#A78BFA" };
      case "category": return { primary: "#EC4899", secondary: "#F472B6" };
      case "SEO": return { primary: "#3B82F6", secondary: "#60A5FA" };
      case "Analytics": return { primary: "#10B981", secondary: "#34D399" };
      case "AI": return { primary: "#8B5CF6", secondary: "#A78BFA" };
      default: return { primary: "#6B7280", secondary: "#9CA3AF" };
    }
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse handlers for zoom and pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(3, zoom + (e.deltaY > 0 ? -0.1 : 0.1)));
    setZoom(newZoom);
  };

  return (
    <section className="relative w-full py-12 md:py-20 px-4 bg-gradient-to-b from-background via-background/95 to-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
              Professional Tools
            </span>{" "}
            Network
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            An interactive network visualization of tools and technologies
          </p>
        </header>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setAnimationsPaused(!animationsPaused)}
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
          >
            {animationsPaused ? 'Resume' : 'Pause'} Animations
          </button>
          <button
            onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
          >
            Reset View
          </button>
        </div>

        {/* Tree Visualization */}
        <div 
          ref={containerRef}
          className="relative w-full h-[600px] bg-[#0b1020] rounded-2xl overflow-hidden border border-border/20"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            className="absolute inset-0"
          >
            <defs>
              {/* Gradients for nodes */}
              {Object.entries({
                root: "#8B5CF6",
                category: "#EC4899", 
                SEO: "#3B82F6",
                Analytics: "#10B981",
                AI: "#8B5CF6"
              }).map(([category, color]) => (
                <radialGradient key={category} id={`gradient-${category}`} cx="30%" cy="30%">
                  <stop offset="0%" stopColor={color} stopOpacity="1" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                </radialGradient>
              ))}

              {/* Animated flow gradient */}
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-100 0;200 0;-100 0"
                  dur="3s"
                  repeatCount={animationsPaused ? "0" : "indefinite"}
                />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Links */}
              {nodes.filter(node => node.parent).map(node => {
                if (!node.parent) return null;
                
                const dx = node.x - node.parent.x;
                const dy = node.y - node.parent.y;
                const dr = Math.sqrt(dx * dx + dy * dy);
                
                return (
                  <g key={`link-${node.id}`}>
                    {/* Base path */}
                    <path
                      d={`M${node.parent.x},${node.parent.y}A${dr},${dr} 0 0,1 ${node.x},${node.y}`}
                      fill="none"
                      stroke="#374151"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    {/* Animated flow */}
                    <path
                      d={`M${node.parent.x},${node.parent.y}A${dr},${dr} 0 0,1 ${node.x},${node.y}`}
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      opacity="0.7"
                    >
                      {!animationsPaused && (
                        <animate
                          attributeName="stroke-dashoffset"
                          values="15;0;15"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      )}
                    </path>
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map(node => {
                const colors = getNodeColor(node.data.category);
                const isHovered = hoveredNode === node.id;
                const radius = node.data.category === 'root' ? 40 : 
                              node.data.category === 'category' ? 32 : 24;
                
                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    {/* Glow ring on hover */}
                    {isHovered && (
                      <circle
                        r={radius + 8}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2"
                        opacity="0.5"
                        filter="url(#glow)"
                      />
                    )}
                    
                    {/* Main node */}
                    <circle
                      r={radius}
                      fill={`url(#gradient-${node.data.category})`}
                      stroke={colors.primary}
                      strokeWidth="2"
                      style={{
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                      }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {!animationsPaused && (
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0,-2;0,2;0,-2"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>

                    {/* Icon */}
                    <foreignObject
                      x={-12}
                      y={-12}
                      width="24"
                      height="24"
                      style={{ pointerEvents: 'none' }}
                    >
                      <node.data.icon className="w-6 h-6 text-white" />
                    </foreignObject>

                    {/* Label */}
                    <text
                      y={radius + 20}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="500"
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.data.name}
                    </text>

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={-60}
                          y={-radius - 40}
                          width="120"
                          height="25"
                          rx="4"
                          fill="rgba(0,0,0,0.8)"
                          stroke="#374151"
                        />
                        <text
                          y={-radius - 22}
                          textAnchor="middle"
                          fill="white"
                          fontSize="11"
                          style={{ pointerEvents: 'none' }}
                        >
                          {node.data.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-4 text-white text-sm">
            <h4 className="font-semibold mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span>Root / AI Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                <span>Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>SEO Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Analytics</span>
              </div>
            </div>
          </div>

          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-2 text-white text-sm">
            Zoom: {Math.round(zoom * 100)}%
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsRadialTree;