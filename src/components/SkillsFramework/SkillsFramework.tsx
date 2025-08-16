import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SkillCard from './SkillCard';
import Arrow from './Arrow';

const SkillsFramework: React.FC = () => {
  const frameworkRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const advancedRef = useRef<HTMLDivElement>(null);
  const technicalSeoRef = useRef<HTMLDivElement>(null);
  const aiSeoRef = useRef<HTMLDivElement>(null);

  const coreSkills = [
    {
      id: 'technical-seo',
      title: 'Technical SEO',
      description: 'Site audits, page speed optimization, schema markup, and crawlability improvements.',
      skills: ['Core Web Vitals', 'Schema Markup', 'Site Architecture', 'Mobile SEO']
    },
    {
      id: 'keyword-research',
      title: 'Keyword Research',
      description: 'Strategic keyword analysis and competitive research for maximum organic visibility.',
      skills: ['SEMrush', 'Ahrefs', 'Keyword Planning', 'Competitor Analysis']
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy',
      description: 'SEO-optimized content planning and optimization for better search rankings.',
      skills: ['Content Optimization', 'Topic Clusters', 'E-A-T', 'User Intent']
    },
    {
      id: 'analytics-reporting',
      title: 'Analytics & Reporting',
      description: 'Data-driven insights and comprehensive SEO performance tracking.',
      skills: ['Google Analytics', 'Search Console', 'Data Studio', 'ROI Tracking']
    }
  ];

  const advancedSkills = [
    {
      id: 'ai-seo',
      title: 'AI SEO',
      description: 'Optimizing websites for AI-powered search engines and LLM models.',
      skills: ['ChatGPT Optimization', 'Perplexity SEO', 'AI Overview', 'LLM Models']
    },
    {
      id: 'semantic-seo',
      title: 'Semantic SEO',
      description: 'Understanding search intent and entity-based optimization strategies.',
      skills: ['Entity Optimization', 'Knowledge Graphs', 'Topic Modeling', 'Intent Matching']
    },
    {
      id: 'local-seo',
      title: 'Local SEO',
      description: 'Google My Business optimization and local search visibility enhancement.',
      skills: ['Google My Business', 'Local Citations', 'Review Management', 'Local Keywords']
    },
    {
      id: 'ecommerce-seo',
      title: 'Ecommerce SEO',
      description: 'Product optimization, category structuring, and conversion-focused SEO.',
      skills: ['Product Schema', 'Category Optimization', 'Technical Audits', 'Conversion Tracking']
    }
  ];

  return (
    <section 
      className="py-12 md:py-16 px-4 bg-gradient-to-b from-background to-muted/10 relative"
      aria-labelledby="skills-framework-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-8 md:mb-12">
          <h2 
            id="skills-framework-title"
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            <span className="text-foreground">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive SEO solutions that drive organic growth and deliver measurable results
          </p>
        </header>

        {/* Main Framework Structure */}
        <div className="relative">
          {/* SEO Skills Framework - Top Level */}
          <div className="flex justify-center mb-6 md:mb-8">
            <SkillCard
              ref={frameworkRef}
              id="seo-skills-framework"
              title="SEO Skills Framework"
              variant="framework"
              colorScheme="primary"
              className="max-w-md"
            />
          </div>

          {/* Core and Advanced Skills - Second Level */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-8">
            <div className="flex justify-center">
              <SkillCard
                ref={coreRef}
                id="core-skills"
                title="Core Skills"
                description="Essential SEO fundamentals for solid organic growth"
                variant="category"
                colorScheme="core"
                className="max-w-sm"
              />
            </div>
            
            <div className="flex justify-center">
              <SkillCard
                ref={advancedRef}
                id="advanced-skills"
                title="Advanced Skills"
                description="Cutting-edge SEO techniques for competitive advantage"
                variant="category"
                colorScheme="advanced"
                className="max-w-sm"
              />
            </div>
          </div>

          {/* Detail Skills - Third Level */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Core Skills Details */}
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <SkillCard
                  ref={technicalSeoRef}
                  id="technical-seo-detail"
                  title="Technical SEO"
                  description="Site audits, page speed optimization, schema markup, and crawlability improvements."
                  skills={['Core Web Vitals', 'Schema Markup', 'Site Architecture', 'Mobile SEO']}
                  variant="detail"
                  colorScheme="core"
                  className="max-w-md"
                />
              </div>
              
              <div className="grid gap-3 md:gap-4">
                {coreSkills.slice(1).map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                  >
                    <SkillCard
                      id={skill.id}
                      title={skill.title}
                      description={skill.description}
                      skills={skill.skills}
                      variant="detail"
                      colorScheme="core"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Advanced Skills Details */}
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <SkillCard
                  ref={aiSeoRef}
                  id="ai-seo-detail"
                  title="AI SEO"
                  description="Optimizing websites for AI-powered search engines and LLM models."
                  skills={['ChatGPT Optimization', 'Perplexity SEO', 'AI Overview', 'LLM Models']}
                  variant="detail"
                  colorScheme="advanced"
                  className="max-w-md"
                />
              </div>
              
              <div className="grid gap-3 md:gap-4">
                {advancedSkills.slice(1).map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                  >
                    <SkillCard
                      id={skill.id}
                      title={skill.title}
                      description={skill.description}
                      skills={skill.skills}
                      variant="detail"
                      colorScheme="advanced"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Connector Arrows */}
          <Arrow
            fromId="seo-skills-framework"
            toId="core-skills"
            variant="core"
            animated={true}
          />
          
          <Arrow
            fromId="seo-skills-framework"
            toId="advanced-skills"
            variant="advanced"
            animated={true}
          />
          
          <Arrow
            fromId="core-skills"
            toId="technical-seo-detail"
            variant="core"
            animated={true}
          />
          
          <Arrow
            fromId="advanced-skills"
            toId="ai-seo-detail"
            variant="advanced"
            animated={true}
          />
        </div>

        {/* Legend */}
        <footer className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-8 md:mt-12">
          <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-md border-2 border-emerald-500/20 rounded-full shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
            <span className="text-sm text-muted-foreground">Core Skills</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-md border-2 border-indigo-500/20 rounded-full shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
            <span className="text-sm text-muted-foreground">Advanced Skills</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default SkillsFramework;