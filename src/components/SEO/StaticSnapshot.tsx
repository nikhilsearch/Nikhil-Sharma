// Static snapshot for bot-friendly content
import StructuredData from './StructuredData';

const StaticSnapshot = () => {
  const staticContent = {
    name: "Nikhil Sharma",
    jobTitle: "Digital Marketing & SEO Specialist",
    description: "Experienced Digital Marketing Specialist with 6+ years in SEO, SEM, Social Media & AI SEO. Proven track record of boosting organic traffic by 300%+",
    coreCompetencies: [
      "Team Leadership",
      "Global SEO Strategy",
      "Technical SEO",
      "AI-Driven Automation",
      "Content Strategy",
      "International SEO"
    ],
    tools: [
      "Google Analytics",
      "Google Search Console",
      "SEMrush",
      "Ahrefs",
      "Screaming Frog",
      "Looker Studio"
    ],
    experience: [
      {
        title: "SEO Team Lead",
        company: "Wavel AI",
        period: "11/2022 - Present",
        achievements: [
          "Led team of 5 SEO specialists across US, APAC, and European markets",
          "Increased blog traffic by 120% through high-intent keyword clustering",
          "Improved technical SEO performance with 35% lift in Good URLs"
        ]
      },
      {
        title: "Technical SEO Specialist",
        company: "Obbserv",
        period: "03/2021 - 10/2022", 
        achievements: [
          "Improved crawl efficiency by 30% through technical optimizations",
          "Maintained 95% client retention rate",
          "Mentored SEO professionals and improved team output by 25%"
        ]
      },
      {
        title: "SEO Executive",
        company: "Elite Info. Tech",
        period: "04/2018 - 02/2021",
        achievements: [
          "Managed 30+ SEO projects across multiple platforms",
          "Optimized 100+ websites with full-spectrum SEO approach",
          "Executed international SEO for clients across 6 regions"
        ]
      }
    ],
    contact: {
      email: "nikhil@example.com",
      location: "India",
      linkedin: "https://linkedin.com/in/nikhilsharma"
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Person" 
        data={{
          name: staticContent.name,
          jobTitle: staticContent.jobTitle,
          description: staticContent.description,
          skills: [...staticContent.coreCompetencies, ...staticContent.tools],
          email: staticContent.contact.email,
          sameAs: [staticContent.contact.linkedin]
        }} 
      />
      
      <StructuredData 
        type="WebSite" 
        data={{
          name: "Nikhil Sharma - Digital Marketing Portfolio",
          description: staticContent.description,
          author: staticContent.name
        }} 
      />

      {/* Static HTML content for bots */}
      <div className="min-h-screen bg-background text-foreground">
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            {staticContent.name}
          </h1>
          <h2 className="text-xl text-center text-muted-foreground mb-8">
            {staticContent.jobTitle}
          </h2>
          <p className="text-center max-w-3xl mx-auto text-lg">
            {staticContent.description}
          </p>
        </header>

        <main className="container mx-auto px-4">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staticContent.coreCompetencies.map((skill, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{skill}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Tools & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {staticContent.tools.map((tool, index) => (
                <div key={index} className="p-3 text-center border rounded">
                  {tool}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Professional Experience</h2>
            <div className="space-y-6">
              {staticContent.experience.map((exp, index) => (
                <div key={index} className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground mb-2">{exp.company} • {exp.period}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>


          <section>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="p-6 border rounded-lg">
              <p className="mb-2"><strong>Email:</strong> {staticContent.contact.email}</p>
              <p className="mb-2"><strong>Location:</strong> {staticContent.contact.location}</p>
              <p><strong>LinkedIn:</strong> <a href={staticContent.contact.linkedin} className="text-primary hover:underline">View Profile</a></p>
            </div>
          </section>
        </main>

        <footer className="mt-16 py-8 border-t text-center text-muted-foreground">
          <p>&copy; 2024 {staticContent.name}. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default StaticSnapshot;