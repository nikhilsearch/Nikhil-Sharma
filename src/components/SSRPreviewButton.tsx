import { Button } from "@/components/ui/button";
import { Code2, ExternalLink } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SSRPreviewButton = ({ className = "" }: { className?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handlePreviewClick = () => {
    const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;
    const previewUrl = `/ssr-preview?url=${encodeURIComponent(currentUrl)}`;
    navigate(previewUrl);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePreviewClick}
      className={`fixed bottom-4 right-4 z-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 ${className}`}
      title="View SSR Snapshot"
    >
      <Code2 className="w-4 h-4 mr-2" />
      SSR Preview
      <ExternalLink className="w-3 h-3 ml-2" />
    </Button>
  );
};

export default SSRPreviewButton;