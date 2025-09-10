import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useSkills } from '@/hooks/useSkills';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DashboardProfile() {
  const { user } = useAuth();
  const { data: profile } = useProfile.useCurrentProfile();
  const { data: allSkills } = useSkills.useAllSkills();
  const { data: userSkills } = useSkills.useUserSkills(profile?.id || '');
  
  const updateProfile = useProfile.useUpdateProfile();
  const addUserSkill = useSkills.useAddUserSkill();
  const removeUserSkill = useSkills.useRemoveUserSkill();

  const [profileForm, setProfileForm] = useState({
    name: profile?.name || '',
    username: profile?.username || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
    headline: profile?.headline || '',
    social_links: {
      github: (profile?.social_links as any)?.github || '',
      linkedin: (profile?.social_links as any)?.linkedin || '',
      twitter: (profile?.social_links as any)?.twitter || '',
      website: (profile?.social_links as any)?.website || ''
    }
  });

  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('3');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(profileForm);
  };

  const handleAddSkill = () => {
    if (!selectedSkill || !profile) return;

    addUserSkill.mutate({
      skillId: selectedSkill,
      level: parseInt(skillLevel)
    }, {
      onSuccess: () => {
        setSelectedSkill('');
        setSkillLevel('3');
      }
    });
  };

  const handleRemoveSkill = (skillId: string) => {
    if (!profile) return;
    removeUserSkill.mutate({
      profileId: profile.id,
      skillId
    });
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading profile...</span>
        </div>
      </div>
    );
  }

  const availableSkills = allSkills?.filter(
    skill => !userSkills?.some(us => us.skill_id === skill.id)
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public portfolio profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar || ''} alt={profile.name || ''} />
                  <AvatarFallback className="text-lg">
                    {profile.name?.split(' ').map(n => n[0]).join('') || profile.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Picture</p>
                  <p className="text-xs text-muted-foreground">Managed through your Clerk account</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={profileForm.username}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="your-username"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Headline</label>
                <Input
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, headline: e.target.value }))}
                  placeholder="e.g., Full Stack Developer | React Enthusiast"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell visitors about yourself..."
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Social Links</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">GitHub</label>
                    <Input
                      value={profileForm.social_links.github}
                      onChange={(e) => setProfileForm(prev => ({ 
                        ...prev, 
                        social_links: { ...prev.social_links, github: e.target.value }
                      }))}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">LinkedIn</label>
                    <Input
                      value={profileForm.social_links.linkedin}
                      onChange={(e) => setProfileForm(prev => ({ 
                        ...prev, 
                        social_links: { ...prev.social_links, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Twitter</label>
                    <Input
                      value={profileForm.social_links.twitter}
                      onChange={(e) => setProfileForm(prev => ({ 
                        ...prev, 
                        social_links: { ...prev.social_links, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Website</label>
                    <Input
                      value={profileForm.social_links.website}
                      onChange={(e) => setProfileForm(prev => ({ 
                        ...prev, 
                        social_links: { ...prev.social_links, website: e.target.value }
                      }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Skills Management */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add Skill */}
              <div className="flex gap-2">
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills.map((skill) => (
                      <SelectItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1/5</SelectItem>
                    <SelectItem value="2">2/5</SelectItem>
                    <SelectItem value="3">3/5</SelectItem>
                    <SelectItem value="4">4/5</SelectItem>
                    <SelectItem value="5">5/5</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={handleAddSkill} 
                  disabled={!selectedSkill || addUserSkill.isPending}
                  size="icon"
                >
                  {addUserSkill.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Current Skills */}
              {userSkills && userSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((userSkill) => (
                    <Badge key={userSkill.skill_id} variant="secondary" className="flex items-center gap-2">
                      {userSkill.skill.name}
                      {userSkill.level && (
                        <span className="text-xs">({userSkill.level}/5)</span>
                      )}
                      <button
                        onClick={() => handleRemoveSkill(userSkill.skill_id)}
                        className="ml-1 hover:text-destructive"
                        disabled={removeUserSkill.isPending}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No skills added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview Link */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Public Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your portfolio is publicly accessible at:</p>
                <p className="font-mono text-sm bg-muted px-2 py-1 rounded mt-1">
                  {window.location.origin}/portfolio/{profile.username}
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href={`/portfolio/${profile.username}`} target="_blank" rel="noopener noreferrer">
                  View Public Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}