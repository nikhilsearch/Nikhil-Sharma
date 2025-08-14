import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import SkillsWeb from "@/components/SkillsWeb";
import ToolsMindMap from "@/components/ToolsMindMap";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Expertise />
      <Experience />
      <SkillsWeb />
      <ToolsMindMap />
      <CaseStudies />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
