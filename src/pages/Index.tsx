import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import ToolsMindMap from "@/components/ToolsMindMap";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Expertise />
      <Experience />
      <ToolsMindMap />
      <CaseStudies />
      <Testimonials />
    </div>
  );
};

export default Index;
