import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Globe,
  Edit,
  Eye,
  MoreVertical,
  Trash2,
  Copy,
  ExternalLink,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { getUserSites } from '@/lib/templates';

interface Site {
  id: string;
  name: string;
  slug: string;
  template: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  visits: number;
  url: string;
  description?: string;
}

const Sites = () => {
  const { user } = useUser();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  const username = user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "user";

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      // Load sites from localStorage for MVP
      setTimeout(() => {
        const userSites = getUserSites(user.id);
        const formattedSites = userSites.map(site => ({
          id: site.id,
          name: site.name,
          slug: site.slug,
          template: site.template || 'Custom',
          status: site.status || 'draft',
          lastModified: site.updatedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          visits: Math.floor(Math.random() * 1000), // Random for demo
          url: `/u/${username}/${site.slug}`,
          description: site.description || ''
        }));
        setSites(formattedSites);
        setLoading(false);
      }, 500);
    }
  }, [user?.id, username]);

  const handleDuplicateSite = (site: Site) => {
    const newSite = {
      ...site,
      id: Date.now().toString(),
      name: `${site.name} (Copy)`,
      slug: `${site.slug}-copy`,
      status: 'draft' as const,
      visits: 0,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setSites(prev => [...prev, newSite]);
    toast.success('Site duplicated successfully');
  };

  const handleDeleteSite = (siteId: string) => {
    setSites(prev => prev.filter(site => site.id !== siteId));
    toast.success('Site deleted successfully');
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`);
    toast.success('URL copied to clipboard');
  };

  const getStatusBadge = (status: Site['status']) => {
    const variants = {
      published: 'default',
      draft: 'secondary',
      archived: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Sites</h1>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            New Site
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Sites</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your portfolio websites
          </p>
        </div>
        <Link to="/dashboard/sites/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Site
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sites</p>
                <p className="text-2xl font-bold">{sites.length}</p>
              </div>
              <Globe className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{sites.filter(s => s.status === 'published').length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-2xl font-bold">{sites.reduce((acc, site) => acc + site.visits, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Visits</p>
                <p className="text-2xl font-bold">
                  {sites.length > 0 ? Math.round(sites.reduce((acc, site) => acc + site.visits, 0) / sites.length) : 0}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sites Grid */}
      {sites.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sites yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first portfolio site to get started
            </p>
            <Link to="/dashboard/sites/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Site
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <Card key={site.id} className="group hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">{site.name}</CardTitle>
                    <CardDescription className="text-sm">
                      /{site.slug}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusBadge(site.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/editor/${site.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={site.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyUrl(site.url)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateSite(site)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Site</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{site.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteSite(site.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Template</p>
                  <p className="text-sm font-medium">{site.template}</p>
                </div>
                
                {site.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">{site.description}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{site.visits} visits</span>
                  </div>
                  <span>Updated {new Date(site.lastModified).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/editor/${site.id}`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sites;