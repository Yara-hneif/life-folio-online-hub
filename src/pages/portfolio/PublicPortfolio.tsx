import { useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useBlogs } from '@/hooks/useBlogs';
import { useProjects } from '@/hooks/useProjects';
import { useEducation } from '@/hooks/useEducation';
import { useExperience } from '@/hooks/useExperience';
import { useCertifications } from '@/hooks/useCertifications';
import { useSkills } from '@/hooks/useSkills';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Mail, ExternalLink, Calendar, MapPin, Building, GraduationCap, Award } from 'lucide-react';
import { useContact } from '@/hooks/useContact';

export default function PublicPortfolio() {
  const { username } = useParams<{ username: string }>();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { data: profile, isLoading: profileLoading } = useProfile.useProfileByUsername(username!);
  const { data: blogs } = useBlogs.usePublicBlogs();
  const { data: projects } = useProjects.usePublicProjects();
  const { data: education } = useEducation.useUserEducation(profile?.id || '');
  const { data: experience } = useExperience.useUserExperience(profile?.id || '');
  const { data: certifications } = useCertifications.useUserCertifications(profile?.id || '');
  const { data: userSkills } = useSkills.useUserSkills(profile?.id || '');
  
  const sendMessage = useContact.useSendMessage();

  const userBlogs = blogs?.filter(blog => blog.user_id === profile?.id) || [];
  const userProjects = projects?.filter(project => project.user_id === profile?.id) || [];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    sendMessage.mutate({
      ...contactForm,
      profileId: profile.id
    }, {
      onSuccess: () => {
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }
    });
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Profile Not Found</h1>
          <p className="text-muted-foreground mt-2">The user @{username} does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.avatar || ''} alt={profile.name || ''} />
              <AvatarFallback className="text-2xl">
                {profile.name?.split(' ').map(n => n[0]).join('') || profile.username[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">{profile.name}</h1>
              <p className="text-xl text-muted-foreground">@{profile.username}</p>
              {profile.headline && <p className="text-lg mt-2">{profile.headline}</p>}
              {profile.bio && <p className="text-muted-foreground mt-4 max-w-2xl">{profile.bio}</p>}
              
              {/* Social Links */}
              {profile.social_links && (
                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                  {Object.entries(profile.social_links as Record<string, string>).map(([platform, url]) => (
                    url && (
                      <Button key={platform} variant="outline" size="sm" asChild>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {platform}
                        </a>
                      </Button>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            {userSkills && userSkills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userSkills.map((userSkill) => (
                      <Badge key={userSkill.skill_id} variant="secondary">
                        {userSkill.skill.name}
                        {userSkill.level && (
                          <span className="ml-1 text-xs">({userSkill.level}/5)</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects */}
            {userProjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {userProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            {project.description && (
                              <p className="text-muted-foreground mt-2">{project.description}</p>
                            )}
                          </div>
                          {project.image_url && (
                            <img 
                              src={project.image_url} 
                              alt={project.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                        </div>
                        
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          {project.live_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.repo_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Blog Posts */}
            {userBlogs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Latest Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userBlogs.slice(0, 5).map((blog) => (
                      <div key={blog.id} className="border-b pb-4 last:border-b-0">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(blog.created_at || '').toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="text-sm flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </p>
                        )}
                        <p className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(exp.start_date || '').toLocaleDateString()} - 
                          {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                        </p>
                        {exp.description && (
                          <p className="text-sm mt-2">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-sm flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="h-4 w-4" />
                          {edu.institution}
                        </p>
                        <p className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(edu.start_date || '').toLocaleDateString()} - 
                          {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
                        </p>
                        {edu.description && (
                          <p className="text-sm mt-2">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-semibold">{cert.title}</h4>
                        <p className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Award className="h-4 w-4" />
                          {cert.issuer}
                        </p>
                        <p className="text-sm flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(cert.issue_date || '').toLocaleDateString()}
                          {cert.expiry_date && ` - ${new Date(cert.expiry_date).toLocaleDateString()}`}
                        </p>
                        {cert.credential_url && (
                          <Button variant="outline" size="sm" className="mt-2" asChild>
                            <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Credential
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Subject (Optional)"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                  />
                  <Button type="submit" disabled={sendMessage.isPending} className="w-full">
                    {sendMessage.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}