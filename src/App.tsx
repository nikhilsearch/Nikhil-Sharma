import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/Admin/BlogEditor";
import BlogDashboard from "./pages/Admin/BlogDashboard";
import SSRPreview from "./pages/SSRPreview";
import NotFound from "./pages/NotFound";
import TechnicalSEO from "./pages/Services/TechnicalSEO";
import AISEOOptimization from "./pages/Services/AISEOOptimization";
import SemanticSEO from "./pages/Services/SemanticSEO";
import LocalSEO from "./pages/Services/LocalSEO";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ssr-preview" element={<SSRPreview />} />
            <Route path="/services/technical-seo" element={<TechnicalSEO />} />
            <Route path="/services/ai-seo-optimization" element={<AISEOOptimization />} />
            <Route path="/services/semantic-seo" element={<SemanticSEO />} />
            <Route path="/services/local-seo" element={<LocalSEO />} />
            <Route path="/admin/blog/*" element={<BlogDashboard />} />
            <Route path="/admin/blog-new" element={<Navigate to="/admin/blog/new" replace />} />
            <Route path="/admin/blog-edit/:id" element={<Navigate to="/admin/blog/edit/$1" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
