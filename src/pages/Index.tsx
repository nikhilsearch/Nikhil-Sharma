import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import ToolsProficiencyRadar from "@/components/ToolsProficiencyRadar";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import FeaturedOn from "@/components/FeaturedOn";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import BotSnapshot from "@/components/SEO/BotSnapshot";
import StaticSnapshot from "@/components/SEO/StaticSnapshot";
import StructuredData from "@/components/SEO/StructuredData";

const Index = () => {
  return (
    <BotSnapshot fallback={<StaticSnapshot />}>
      <StructuredData 
        type="Person" 
        data={{
          name: "Nikhil Sharma",
          jobTitle: "Digital Marketing & SEO Specialist",
          description: "Experienced Digital Marketing Specialist with 6+ years in SEO, SEM, Social Media & AI SEO. Proven track record of boosting organic traffic by 300%+",
          skills: ["SEO", "SEM", "Social Media Marketing", "AI SEO", "Content Marketing"],
          email: "nikhil@example.com",
          sameAs: ["https://linkedin.com/in/nikhilsharma"]
        }} 
      />
      
      <StructuredData 
        type="WebSite" 
        data={{
          name: "Nikhil Sharma - Digital Marketing Portfolio",
          description: "Professional digital marketing portfolio showcasing SEO expertise and proven results",
          author: "Nikhil Sharma"
        }} 
      />

      <div className="min-h-screen">
        <Header />
        <section id="about">
          <Hero />
        </section>
        <section id="skills">
          <Expertise />
          <ToolsProficiencyRadar />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="stories">
          <CaseStudies />
          <Testimonials />
        </section>
        <section id="featured">
          <FeaturedOn />
        </section>
        <section id="contact">
          <Footer />
        </section>
        <ThemeToggle />
      </div>
    </BotSnapshot>
  );
};

export default Index;
