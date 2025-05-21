
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Welcome to My Portfolio Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Documenting my work and life through creative projects and personal experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg">
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              A selection of my most recent and noteworthy work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="rounded-lg border bg-card overflow-hidden card-hover"
              >
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                  <p className="text-muted-foreground mb-4">
                    A brief description of this project and what technologies were used.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/projects/${item}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-primary/20 rounded-full max-w-md mx-auto"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground mb-6">
                I'm a passionate developer and designer with a love for creating meaningful and beautiful digital experiences. My journey has taken me through various technologies and projects, each one teaching me something new.
              </p>
              <Button asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Have a project in mind or want to know more about my work? I'd love to hear from you.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/contact">Contact Me</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
