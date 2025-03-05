export type CollectionName = 'blog' | 'projects';

export type GlobalSite = {
  title: string;
  description: string;
  author: string;
  authorPhotoSrc: string;
  logo?: {
    darkThemeSrc?: string;
    lightThemeSrc?: string;
  };
};

export const GLOBAL: GlobalSite = {
  title: 'Mike Rice',
  description: 'coding between the mountains and the sea',
  author: 'Mike Rice',
  authorPhotoSrc: '/mike-headshot.jpg',
};

type CollectionSite = {
  pageSize: number;
};

type HomeSite = {
  blogEntries?: number;
  projectEntries?: number;
  talkEntries?: number;
};

export const HOME: HomeSite = {
  blogEntries: 5,
  projectEntries: 3,
  talkEntries: 3,
};

type BlogSite = CollectionSite & {
  license: {
    name: string;
    href: string;
  };
};

export const BLOG: BlogSite = {
  pageSize: 20,
  license: {
    name: 'CC BY-NC-ND 4.0',
    href: 'https://creativecommons.org/licenses/by-nc-nd/4.0',
  },
};

export const PROJECTS: CollectionSite = {
  pageSize: 10,
};

export const TAGS: CollectionSite = {
  pageSize: 10,
};

type ContactInfo = {
  type: string;
  href: string;
  displayAs?: string;
};

type ContactSite = ContactInfo[];

export const CONTACT: ContactSite = [
  {
    type: 'Email',
    href: 'mailto:mike.hj.rice@gmail.com',
    displayAs: 'mike.hj.rice@gmail.com',
  },
  {
    type: 'GitHub',
    href: 'https://github.com/mikerice',
  },
  {
    type: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mikehjrice/',
  },
];
