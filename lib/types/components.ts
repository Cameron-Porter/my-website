/**
 * Component Prop Types
 *
 * TypeScript interfaces for all marketing and UI component props.
 */

/** Props for the Header component */
export interface HeaderProps {
  className?: string;
}

/** Props for the Footer component */
export interface FooterProps {
  className?: string;
}

/** Props for the MobileNav component */
export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}
