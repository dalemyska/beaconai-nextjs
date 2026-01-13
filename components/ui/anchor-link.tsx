'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ReactNode } from "react";

export interface AnchorLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  className?: string;
  children?: ReactNode;
}

export const AnchorLink = ({
  children,
  href,
  className,
  ...props
}: AnchorLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an anchor link
    if (typeof href === "string" && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
        // Set focus to the element or the first focusable child
        setTimeout(() => {
          const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
          } else {
            element.setAttribute('tabindex', '-1');
            element.focus();
            // Remove tabindex after focus to prevent keyboard navigation issues
            element.addEventListener('blur', () => {
              element.removeAttribute('tabindex');
            }, { once: true });
          }
        }, 500);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' && typeof href === "string" && href.startsWith("#")) {
      handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
    }
  };

  // For anchor links, use a regular anchor tag
  if (typeof href === "string" && href.startsWith("#")) {
    return (
      <a
        href={href}
        className={cn(className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        aria-label={`Scroll to ${href.substring(1)}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  // For regular links, use Next.js Link
  return (
    <Link
      href={href}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
};
