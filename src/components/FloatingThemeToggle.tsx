import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const FloatingThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 group relative p-4 rounded-full 
        bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-lg 
        border border-border/40 transition-all duration-700 ease-out 
        hover:scale-110 hover:rotate-12 hover:-translate-y-2 active:scale-100 
        hover:text-primary hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]
        hover:bg-primary/10 hover:border-primary/50 hover:shadow-2xl 
        transform-gpu will-change-transform shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-yellow-500 transition-all duration-500 
          group-hover:scale-125 group-hover:rotate-6 transform-gpu" />
      ) : (
        <Moon className="w-6 h-6 text-blue-600 transition-all duration-500 
          group-hover:scale-125 group-hover:rotate-6 transform-gpu" />
      )}
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/0 to-primary/0 
        group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-500" />
      
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-transparent 
        via-primary/30 to-transparent opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 -z-10 blur-sm" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 text-sm font-medium 
        text-foreground bg-background/95 backdrop-blur-lg border border-border/40 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        pointer-events-none whitespace-nowrap shadow-lg">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </div>
    </button>
  );
};

export default FloatingThemeToggle;