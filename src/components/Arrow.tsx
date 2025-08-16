import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

type ArrowProps = {
  fromId: string;
  toId: string;
  variant: 'core' | 'advanced';
  animated?: boolean;
};

const Arrow = ({ fromId, toId, variant, animated = true }: ArrowProps) => {
  const [path, setPath] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const gradientColors = {
    core: {
      start: 'rgb(34, 197, 94)', // emerald-500
      middle: 'rgb(20, 184, 166)', // teal-500
      end: 'rgb(6, 182, 212)' // cyan-500
    },
    advanced: {
      start: 'rgb(99, 102, 241)', // indigo-500
      middle: 'rgb(139, 92, 246)', // violet-500
      end: 'rgb(217, 70, 239)' // fuchsia-500
    }
  };

  const updatePath = () => {
    const fromElement = document.getElementById(fromId);
    const toElement = document.getElementById(toId);
    
    if (!fromElement || !toElement || !svgRef.current) return;

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();

    // Calculate relative positions
    const fromX = fromRect.left + fromRect.width / 2 - svgRect.left;
    const fromY = fromRect.bottom - svgRect.top;
    const toX = toRect.left + toRect.width / 2 - svgRect.left;
    const toY = toRect.top - svgRect.top;

    // Create smooth curved path
    const midY = fromY + (toY - fromY) * 0.6;
    const controlPoint1X = fromX;
    const controlPoint1Y = midY;
    const controlPoint2X = toX;
    const controlPoint2Y = midY;

    const pathString = `M ${fromX} ${fromY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toX} ${toY}`;
    setPath(pathString);
  };

  useEffect(() => {
    updatePath();
    
    const resizeObserver = new ResizeObserver(updatePath);
    const fromElement = document.getElementById(fromId);
    const toElement = document.getElementById(toId);
    
    if (fromElement) resizeObserver.observe(fromElement);
    if (toElement) resizeObserver.observe(toElement);

    window.addEventListener('resize', updatePath);
    window.addEventListener('scroll', updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePath);
      window.removeEventListener('scroll', updatePath);
    };
  }, [fromId, toId]);

  if (!path) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ top: 0, left: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`gradient-${variant}-${fromId}-${toId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors[variant].start} stopOpacity="0.8" />
          <stop offset="50%" stopColor={gradientColors[variant].middle} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors[variant].end} stopOpacity="0.8" />
        </linearGradient>
        
        <filter id={`glow-${variant}-${fromId}-${toId}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <marker
          id={`arrowhead-${variant}-${fromId}-${toId}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <motion.polygon
            points="0,0 0,6 9,3"
            fill={`url(#gradient-${variant}-${fromId}-${toId})`}
            animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </marker>
      </defs>

      <motion.path
        d={path}
        stroke={`url(#gradient-${variant}-${fromId}-${toId})`}
        strokeWidth={isHovered ? 4 : 3}
        fill="none"
        markerEnd={`url(#arrowhead-${variant}-${fromId}-${toId})`}
        filter={isHovered ? `url(#glow-${variant}-${fromId}-${toId})` : undefined}
        className="pointer-events-auto cursor-pointer"
        style={{
          strokeDasharray: animated ? '10 5' : 'none',
        }}
        animate={animated ? {
          strokeDashoffset: [-50, 0],
          opacity: [0.6, 1, 0.6]
        } : {}}
        transition={animated ? {
          strokeDashoffset: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          },
          opacity: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </svg>
  );
};

export default Arrow;