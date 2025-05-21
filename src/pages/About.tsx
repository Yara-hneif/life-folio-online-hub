
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  // Skills data
  const skills = [
    { category: "Frontend", items: ["HTML/CSS", "JavaScript", "React", "Vue.js", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "PHP"] },
    { category: "Database", items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Figma", "VS Code"] },
  ];

  // Timeline data
  const timeline = [
    {
      year: "2023",
      title: "Senior Developer",
      company: "Tech Solutions Inc.",
      description: "Leading a team of developers to build scalable web applications.",
    },
    {
      year: "2021",
      title: "Full Stack Developer",
      company: "Digital Innovations",
      description: "Developed and maintained various client projects using modern web technologies.",
    },
    {
      year: "2019",
      title: "Frontend Developer",
      company: "Creative Agency",
      description: "Created responsive and interactive user interfaces for client websites.",
    },
    {
      year: "2017",
      title: "Web Design Intern",
      company: "StartUp Hub",
      description: "Assisted in designing and implementing website layouts and features.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground">
              Get to know more about my background, skills, and experience.
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-padding">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-primary/20 rounded-lg max-w-md mx-auto"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">My Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hello! I'm a passionate web developer and designer with over 5 years of experience creating digital experiences. I specialize in building responsive, user-friendly websites and applications.
                </p>
                <p>
                  My journey in web development started during college when I took my first programming course. Since then, I've been continuously learning and expanding my skills through various projects and roles.
                </p>
                <p>
                  I believe in creating websites that not only look good but also provide value to users through intuitive design and smooth functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l border-muted pl-6 space-y-10">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] rounded-full w-6 h-6 bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 bg-background rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">{item.year}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <div className="text-muted-foreground mb-2">{item.company}</div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Work Together?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            If you're interested in collaborating on a project or have any questions, feel free to reach out.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/contact">Contact Me</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
