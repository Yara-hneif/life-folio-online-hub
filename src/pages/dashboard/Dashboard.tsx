import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, 
  Plus, 
  Users, 
  Eye,
  BarChart3,
  TrendingUp
} from 'lucide-react';

// Mock data for dashboard stats
const mockStats = {
  totalProjects: 12,
  collaborations: 8,
  profileViews: 156,
  newViews: 23
};

const mockRecentProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with React and Node.js',
    status: 'completed',
    updatedAt: '2024-01-15',
    collaborators: 2
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'Modern portfolio built with Next.js and Tailwind CSS',
    status: 'in-progress',
    updatedAt: '2024-01-10',
    collaborators: 1
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    status: 'planning',
    updatedAt: '2024-01-08',
    collaborators: 3
  }
];

type PageItem = { id?: string; name: string; slug: string; isHome?: boolean; builderJson?: any };

const Dashboard = () => {
  const { user } = useUser();
  const [pages, setPages] = useState<PageItem[]>([]);
  const username = user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "user";
  const siteSlug = username;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_BUILDER_PUBLIC_KEY;
    if (!apiKey || !user?.id) return;
    
    const q = encodeURIComponent(JSON.stringify({ "data.userId": user?.id, "data.siteSlug": siteSlug }));
    fetch(`https://cdn.builder.io/api/v3/content/page?apiKey=${apiKey}&limit=50&query=${q}`)
      .then(r => r.json())
      .then(res => {
        const items = (res?.results || []).map((r: any) => ({
          id: r?.id,
          name: r?.name || r?.data?.name || r?.data?.slug || "Untitled",
          slug: r?.data?.slug || "untitled",
          isHome: !!r?.data?.isHome,
          builderJson: r,
        }));
        setPages(items);
      })
      .catch(() => setPages([]));
  }, [user?.id, siteSlug]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || user?.username}!</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio site: /u/{siteSlug}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/sites/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Site
            </Button>
          </Link>
          <Link to="/editor/new">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              New Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>My Pages</CardTitle>
          <CardDescription>
            Manage your site pages and content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No pages found. Create your first page to get started.</p>
              <Link to="/editor/new">
                <Button variant="outline">Create First Page</Button>
              </Link>
            </div>
          ) : (
            pages.map(p => (
              <div key={p.slug} className="rounded-xl border p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-muted-foreground">
                    /u/{siteSlug}/{p.isHome ? "" : p.slug}{p.isHome ? " (home)" : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/editor/${p.id || p.slug}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <a href={`/u/${siteSlug}/${p.isHome ? "" : p.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.collaborations}</div>
            <p className="text-xs text-muted-foreground">
              Active collaborations
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.profileViews}</div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.newViews} this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              Profile engagement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Projects
              <Link to="/dashboard/projects">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
            <CardDescription>
              Your latest project activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentProjects.map((project) => (
              <div key={project.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge 
                      variant={project.status === 'completed' ? 'default' : 
                               project.status === 'in-progress' ? 'secondary' : 'outline'}
                    >
                      {project.status.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.collaborators} collaborator{project.collaborators !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Link to={`/dashboard/projects/${project.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/dashboard/projects/new" className="block">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
            </Link>
            <Link to="/dashboard/profile" className="block">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
            </Link>
            <Link to={`/u/${user?.username}`} className="block">
              <Button className="w-full justify-start" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;