// Bot-friendly snapshot component for dynamic rendering
import { useEffect, useState } from 'react';
import { isBot } from '@/utils/botDetection';

interface BotSnapshotProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const BotSnapshot = ({ children, fallback }: BotSnapshotProps) => {
  const [isUserBot, setIsUserBot] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user agent indicates a bot
    const userAgent = navigator.userAgent;
    const botDetected = isBot(userAgent);
    
    setIsUserBot(botDetected);
    setIsLoading(false);

    // Add meta tag to indicate dynamic rendering capability
    const metaTag = document.createElement('meta');
    metaTag.name = 'robots';
    metaTag.content = 'index,follow';
    document.head.appendChild(metaTag);

    // Add canonical link
    const canonicalTag = document.createElement('link');
    canonicalTag.rel = 'canonical';
    canonicalTag.href = window.location.href;
    document.head.appendChild(canonicalTag);

    return () => {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (robotsMeta) robotsMeta.remove();
      if (canonicalLink) canonicalLink.remove();
    };
  }, []);

  // Show loading state briefly to allow detection
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If bot is detected and fallback is provided, render fallback
  if (isUserBot && fallback) {
    return <>{fallback}</>;
  }

  // Otherwise render children normally
  return <>{children}</>;
};

export default BotSnapshot;
