// Template system for VitePortfolio
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  features: string[];
  blocks: any[];
  isPopular?: boolean;
  demoUrl?: string;
}

export const createSiteFromTemplate = async (
  template: Template,
  siteData: {
    name: string;
    slug: string;
    description: string;
    userId: string;
  }
) => {
  // Create Builder.io content from template
  const builderContent = {
    data: {
      userId: siteData.userId,
      siteSlug: siteData.slug,
      slug: 'home',
      isHome: true,
      title: siteData.name,
      description: siteData.description,
      template: template.id,
    },
    blocks: template.blocks.map(block => ({
      ...block,
      // Customize block content with site data
      component: {
        ...block.component,
        options: {
          ...block.component.options,
          // Replace template placeholders with actual data
          title: block.component.options?.title?.includes('Your Name') 
            ? block.component.options.title.replace('Your Name', siteData.name)
            : block.component.options?.title,
        }
      }
    }))
  };

  // In a real implementation, this would save to Builder.io using their API
  console.log('Creating site with Builder.io content:', builderContent);
  
  // For now, store in localStorage as MVP
  const siteId = `site_${Date.now()}`;
  localStorage.setItem(`viteportfolio_site_${siteId}`, JSON.stringify({
    id: siteId,
    ...siteData,
    template: template.id,
    content: builderContent,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft'
  }));

  return siteId;
};

export const getUserSites = (userId: string) => {
  const sites = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('viteportfolio_site_')) {
      const siteData = JSON.parse(localStorage.getItem(key) || '{}');
      if (siteData.userId === userId) {
        sites.push(siteData);
      }
    }
  }
  return sites;
};