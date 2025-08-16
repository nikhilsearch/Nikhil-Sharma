import { useEffect, useState, RefObject } from 'react';

type Point = {
  x: number;
  y: number;
};

type UseConnectorProps = {
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  containerRef?: RefObject<HTMLElement>;
};

export const useConnector = ({ fromRef, toRef, containerRef }: UseConnectorProps) => {
  const [path, setPath] = useState('');
  const [fromPoint, setFromPoint] = useState<Point | null>(null);
  const [toPoint, setToPoint] = useState<Point | null>(null);

  useEffect(() => {
    const calculatePath = () => {
      if (!fromRef.current || !toRef.current) return;

      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();
      const container = containerRef?.current || fromRef.current.closest('section');
      
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      
      // Calculate relative positions within the container
      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.bottom - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY = toRect.top - containerRect.top;
      
      setFromPoint({ x: fromX, y: fromY });
      setToPoint({ x: toX, y: toY });
      
      // Create smooth bezier curve
      const controlPoint1Y = fromY + (toY - fromY) * 0.3;
      const controlPoint2Y = fromY + (toY - fromY) * 0.7;
      
      const newPath = `M ${fromX} ${fromY} C ${fromX} ${controlPoint1Y}, ${toX} ${controlPoint2Y}, ${toX} ${toY}`;
      setPath(newPath);
    };

    calculatePath();
    
    const resizeObserver = new ResizeObserver(calculatePath);
    const elements = [fromRef.current, toRef.current].filter(Boolean);
    elements.forEach(el => el && resizeObserver.observe(el));
    
    window.addEventListener('resize', calculatePath);
    window.addEventListener('scroll', calculatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculatePath);
      window.removeEventListener('scroll', calculatePath);
    };
  }, [fromRef, toRef, containerRef]);

  return { path, fromPoint, toPoint };
};