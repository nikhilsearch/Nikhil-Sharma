// Static snapshot for bot-friendly content
import StructuredData from './StructuredData';

const StaticSnapshot = () => {
  const staticContent = {
    name: "Nikhil Sharma",
    jobTitle: "Digital Marketing & SEO Specialist",
    description: "Experienced Digital Marketing Specialist with 6+ years in SEO, SEM, Social Media & AI SEO. Proven track record of boosting organic traffic by 300%+",
    skills: [
      "Search Engine Optimization (SEO)",
      "Search Engine Marketing (SEM)", 
      "Social Media Marketing",
      "AI-Powered SEO",
      "Content Marketing",
      "Google Analytics",
      "Google Ads",
      "Facebook Ads",
      "Conversion Rate Optimization"
    ],
    experience: [
      {
        title: "Senior Digital Marketing Specialist",
        company: "TechCorp",
        period: "2020 - Present",
        achievements: ["Increased organic traffic by 300%", "Managed $500K+ ad spend", "Led team of 5 marketers"]
      },
      {
        title: "SEO Specialist",
        company: "MarketingPro",
        period: "2018 - 2020", 
        achievements: ["Improved search rankings for 50+ keywords", "Reduced acquisition cost by 40%"]
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
          skills: staticContent.skills,
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
            <h2 className="text-2xl font-semibold mb-6">Core Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staticContent.skills.map((skill, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{skill}</h3>
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

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Tools & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Google Analytics", "Google Ads", "Facebook Ads", "SEMrush", "Ahrefs", "Screaming Frog", "Google Search Console", "Hotjar"].map((tool, index) => (
                <div key={index} className="p-3 text-center border rounded">
                  {tool}
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