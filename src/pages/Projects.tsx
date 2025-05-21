
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock project data
const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store with product listings, cart functionality, and secure checkout.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "",
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather information app with location detection and forecast data.",
    tags: ["React", "Weather API", "Geolocation"],
    imageUrl: "",
  },
  {
    id: 3,
    title: "Task Management System",
    description: "A collaborative tool for teams to manage projects, tasks, and deadlines efficiently.",
    tags: ["React", "Express", "PostgreSQL", "Socket.io"],
    imageUrl: "",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A responsive personal portfolio website to showcase projects and skills.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    imageUrl: "",
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "An application to track workouts, nutrition, and fitness progress over time.",
    tags: ["React", "Chart.js", "Firebase"],
    imageUrl: "",
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "Search and discover recipes based on available ingredients and dietary preferences.",
    tags: ["React", "Food API", "Redux"],
    imageUrl: "",
  },
];

const Projects = () => {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-xl text-muted-foreground">
              A collection of my work, showcasing various skills and technologies.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="card-hover">
                <div className="aspect-video bg-muted"></div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/projects/${project.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
