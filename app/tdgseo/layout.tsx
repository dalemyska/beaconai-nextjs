import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TDG SEO Tool',
  description: 'Internal vendor tool',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TDGSeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
