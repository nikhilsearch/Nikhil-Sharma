import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg"
        >
          <div className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-500 transition-all" />
        ) : (
          <Moon className="h-5 w-5 text-blue-600 transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;