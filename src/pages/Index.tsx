import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import ToolsProficiencyRadar from "@/components/ToolsProficiencyRadar";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import FeaturedOn from "@/components/FeaturedOn";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import ThemeToggle from "@/components/ThemeToggle";
import BotSnapshot from "@/components/SEO/BotSnapshot";
import StaticSnapshot from "@/components/SEO/StaticSnapshot";
import StructuredData from "@/components/SEO/StructuredData";
import MetaGenerator, { metaConfigs } from "@/components/SEO/MetaGenerator";

const Index = () => {
  useEffect(() => {
    // Enhanced canonical URL handling
    const canonicalUrl = window.location.href.split('?')[0].split('#')[0];
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      const newCanonicalLink = document.createElement('link');
      newCanonicalLink.setAttribute('rel', 'canonical');
      newCanonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(newCanonicalLink);
    }
  }, []);

  return (
    <>
      {/* Enhanced SEO Components */}
      <MetaGenerator 
        config={metaConfigs.home}
        siteName="Digital Marketing & SEO Expert Portfolio"
        siteUrl={window.location.origin}
        twitterHandle="@seoexpert"
      />
      
      <BotSnapshot fallback={<StaticSnapshot />}>
        {/* Enhanced Structured Data */}
        <StructuredData 
          type="Person" 
          data={{
            name: "Digital Marketing Expert",
            jobTitle: "Senior Digital Marketing Strategist & SEO Specialist",
            description: "Experienced digital marketing professional specializing in SEO, content strategy, technical optimization, and business growth with measurable results. Featured on HubSpot, SEO Testing, EmbedSocial, and AMA Phoenix.",
            skills: ["SEO", "Content Marketing", "Technical SEO", "Analytics", "Strategy", "AI SEO", "Local SEO"],
            experience: "6+ years",
            location: "Remote/Global",
            website: window.location.origin,
            email: "contact@example.com",
            sameAs: [
              "https://blog.hubspot.com/sales/ai-business-integration",
              "https://seotesting.com/blog/technical-seo-for-ecommerce/",
              "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
              "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/"
            ],
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                name: "Google Analytics Certified",
                credentialCategory: "Professional Certification"
              },
              {
                "@type": "EducationalOccupationalCredential", 
                name: "HubSpot Content Marketing Certified",
                credentialCategory: "Professional Certification"
              }
            ]
          }} 
        />
        
        <StructuredData 
          type="WebSite" 
          data={{
            name: "Digital Marketing & SEO Expert Portfolio",
            description: "Expert digital marketing and SEO services with proven results. Featured on HubSpot, SEO Testing, EmbedSocial, and AMA Phoenix.",
            url: window.location.origin,
            potentialAction: {
              "@type": "SearchAction",
              target: `${window.location.origin}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            },
            author: {
              "@type": "Person",
              name: "Digital Marketing Expert"
            }
          }} 
        />

        <StructuredData 
          type="Organization" 
          data={{
            name: "Digital Marketing Expert Services",
            description: "Professional digital marketing and SEO services with proven results",
            url: window.location.origin,
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["English"],
              serviceType: "Digital Marketing Consultation"
            },
            sameAs: [
              "https://blog.hubspot.com/sales/ai-business-integration",
              "https://seotesting.com/blog/technical-seo-for-ecommerce/",
              "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
              "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/"
            ],
            foundingDate: "2018",
            numberOfEmployees: "1-10",
            serviceArea: "Worldwide"
          }} 
        />

        <div className="min-h-screen bg-background text-foreground">
          <Header />
          
          <main>
            <section id="about" className="scroll-mt-16">
              <Hero />
            </section>
            
            <section id="featured" className="scroll-mt-16">
              <FeaturedOn />
            </section>
            
            <section id="case-studies" className="scroll-mt-16">
              <CaseStudies />
            </section>
            
            <section id="skills" className="scroll-mt-16">
              <Expertise />
              <ToolsProficiencyRadar />
            </section>
            
            <section id="experience" className="scroll-mt-16">
              <Experience />
            </section>
            
            <section id="testimonials" className="scroll-mt-16">
              <Testimonials />
            </section>
            
            <section id="faq" className="scroll-mt-16">
              <FAQ />
            </section>
            
            <section id="contact" className="scroll-mt-16">
              <Footer />
            </section>
          </main>
          
          <ThemeToggle />
        </div>
      </BotSnapshot>
    </>
  );
};

export default Index;
