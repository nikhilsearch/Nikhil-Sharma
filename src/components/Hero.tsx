import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-6xl lg:text-7xl font-bold">
            <span className="text-foreground">Nikhil</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Sharma
            </span>
            <br />
            <span className="text-foreground text-4xl lg:text-5xl">Dynamic SEO Lead</span>
          </h1>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-primary">SEO Expert | 7+ Years Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Dynamic SEO Lead driving organic growth for global brands across competitive industries. 
              Adept at executing data-driven SEO strategies that boost visibility, lead generation, and revenue 
              with proven track record of leading cross-functional teams and consistently surpassing KPIs.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/nikhil-sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0077B5] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0077B5]/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#00A0DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="relative w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="relative">LinkedIn Profile</span>
              </a>
              
              <a
                href="/resume.pdf"
                download
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-purple-400 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="relative">Download Resume</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img
              src="/lovable-uploads/209a2e34-b533-4448-a499-e64d4c9cdf98.png"
              alt="Nikhil Sharma - SEO Expert"
              className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;