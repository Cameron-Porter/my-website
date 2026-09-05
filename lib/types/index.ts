/** Navigation link used in header, footer, and mobile nav */
export interface NavLink {
  label: string;
  href: string;
}

/** Page-level SEO metadata */
export interface SiteMetadata {
  /** Max 60 characters */
  title: string;
  /** Max 160 characters */
  description: string;
  /** Max 10 keywords */
  keywords: string[];
  ogImage: string;
  url: string;
}
