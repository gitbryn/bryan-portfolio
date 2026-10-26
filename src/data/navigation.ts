export type SectionId = 'home' | 'about' | 'journey' | 'expertise' | 'process' | 'projects' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

/** Links in the main navigation, in page order. */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'process', label: 'My Process' },
  { id: 'projects', label: 'Projects' },
];

/** Every section rendered on the page, in order (used for scroll tracking). */
export const sectionIds: SectionId[] = [...navItems.map((item) => item.id), 'contact'];
