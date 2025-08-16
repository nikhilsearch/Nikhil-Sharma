import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type ArrowProps = {
  fromId: string;
  toId: string;
  variant: 'core' | 'advanced';
  animated?: boolean;
  className?: string;
};

const Arrow: React.FC<ArrowProps> = ({ fromId, toId, variant, animated = true, className = '' }) => {
  const [path, setPath] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const gradientId = `gradient-${variant}-${fromId}-${toId}`;
  const pathId = `path-${fromId}-${toId}`;

  const gradients = {
    core: {
      from: '#10b981', // emerald-500
      via: '#14b8a6',  // teal-500
      to: '#06b6d4'    // cyan-500
    },
    advanced: {
      from: '#6366f1', // indigo-500
      via: '#8b5cf6',  // violet-500
      to: '#d946ef'    // fuchsia-500
    }
  };

  useEffect(() => {
    const calculatePath = () => {
      const fromEl = document.getElementById(fromId);
      const toEl = document.getElementById(toId);
      
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const container = fromEl.closest('section');
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      
      // Calculate relative positions within the container
      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.bottom - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY = toRect.top - containerRect.top;
      
      // Create curved path
      const controlPointY = fromY + (toY - fromY) * 0.5;
      const newPath = `M ${fromX} ${fromY} Q ${fromX} ${controlPointY} ${toX} ${toY}`;
      
      setPath(newPath);
      setIsVisible(true);
    };

    calculatePath();
    
    const resizeObserver = new ResizeObserver(calculatePath);
    const elements = [document.getElementById(fromId), document.getElementById(toId)].filter(Boolean);
    elements.forEach(el => el && resizeObserver.observe(el));
    
    window.addEventListener('resize', calculatePath);
    window.addEventListener('scroll', calculatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculatePath);
      window.removeEventListener('scroll', calculatePath);
    };
  }, [fromId, toId]);

  const currentGradient = gradients[variant];

  if (!isVisible || !path) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg 
        className="w-full h-full" 
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={currentGradient.from} stopOpacity="0.8" />
            <stop offset="50%" stopColor={currentGradient.via} stopOpacity="0.9" />
            <stop offset="100%" stopColor={currentGradient.to} stopOpacity="0.8" />
          </linearGradient>
          
          <marker
            id={`arrowhead-${variant}-${fromId}-${toId}`}
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            className="md:scale-125"
          >
            <motion.polygon
              points="0,0 0,8 10,4"
              fill={`url(#${gradientId})`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </marker>
        </defs>
        
        <motion.path
          id={pathId}
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          fill="none"
          markerEnd={`url(#arrowhead-${variant}-${fromId}-${toId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:stroke-[4] hover:drop-shadow-lg transition-all duration-300"
          style={{
            filter: `drop-shadow(0 0 6px ${currentGradient.via}40)`
          }}
        />
        
        {animated && (
          <motion.circle
            r="3"
            fill={currentGradient.via}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              offsetDistance: ['0%', '100%']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 1 
            }}
            style={{ offsetPath: `path('${path}')` }}
            className="hidden md:block"
          />
        )}
      </svg>
    </div>
  );
};

export default Arrow;