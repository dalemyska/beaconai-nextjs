import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beaconai.ai"),
  title: {
    default: "BeaconAI - AI Implementation & Strategy Consulting | Practical Solutions",
    template: "%s | BeaconAI",
  },
  description:
    "Transform your business with AI implementation that delivers real ROI. BeaconAI provides practical AI strategy and implementation services for businesses of all sizes.",
  keywords: [
    "AI consulting",
    "AI implementation",
    "AI strategy",
    "artificial intelligence consulting",
    "business AI solutions",
    "AI transformation",
  ],
  authors: [{ name: "BeaconAI" }],
  creator: "BeaconAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beaconai.ai",
    siteName: "BeaconAI",
    title: "BeaconAI - AI Implementation & Strategy Consulting",
    description:
      "Transform your business with AI implementation that delivers real ROI. Practical solutions for businesses of all sizes.",
    images: [
      {
        url: "/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png",
        width: 1200,
        height: 630,
        alt: "BeaconAI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@beaconai",
    title: "BeaconAI - AI Implementation & Strategy Consulting",
    description:
      "Transform your business with AI implementation that delivers real ROI.",
    images: ["/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png",
    apple: "/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Organization structured data - static content, safe to inject */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BeaconAI",
              url: "https://beaconai.ai",
              logo: "https://beaconai.ai/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png",
              description: "AI Implementation & Strategy Consulting - Practical Solutions for businesses of all sizes.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-720-249-1174",
                contactType: "customer service",
                email: "info@beaconai.ai",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${sourceSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <ScrollToTop />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7251420";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight-loader" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
      </body>
    </html>
  );
}
