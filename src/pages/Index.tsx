import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import ToolsMindMap from "@/components/ToolsMindMap";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section id="about">
        <Hero />
      </section>
      <section id="skills">
        <Expertise />
        <ToolsMindMap />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="stories">
        <CaseStudies />
        <Testimonials />
      </section>
      <section id="contact">
        <Footer />
      </section>
      <ThemeToggle />
    </div>
  );
};

export default Index;
