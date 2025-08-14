import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import ToolsMindMap from "@/components/ToolsMindMap";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Expertise />
      <ToolsMindMap />
      <CaseStudies />
      <Testimonials />
    </div>
  );
};

export default Index;
