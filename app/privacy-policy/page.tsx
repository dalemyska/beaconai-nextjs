import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection | BeaconAI',
  description: 'BeaconAI Consulting privacy policy and data protection practices.',
  alternates: {
    canonical: 'https://beaconai.ai/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-beacon-navy mb-8">PRIVACY POLICY</h1>
        <p className="text-gray-600 mb-8">Last Updated: April 12, 2025</p>

        <section className="mb-10">
          <h2 className="text-2xl font-montserrat font-semibold text-beacon-navy mb-4">1. INTRODUCTION</h2>
          <p className="mb-4">
            Beacon AI Consulting LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          <p className="mb-4">
            This privacy policy applies to information we collect on our website, in email, text, or other electronic messages between you and our website, and when you interact with our advertising and applications on third-party websites and services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-montserrat font-semibold text-beacon-navy mb-4">2. THE DATA WE COLLECT</h2>
          <p className="mb-4">We may collect several different types of information, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Personal identification information</strong> - Name, email address, phone number, company, job title</li>
            <li><strong>Contact information</strong> - Billing address, delivery address, email address, telephone numbers</li>
            <li><strong>Technical information</strong> - Internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform, and other technology on the devices you use to access this website</li>
            <li><strong>Usage information</strong> - Information about how you use our website, products, and services</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-montserrat font-semibold text-beacon-navy mb-4">3. HOW WE USE YOUR DATA</h2>
          <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To register you as a new customer</li>
            <li>To process and deliver your order or service</li>
            <li>To manage our relationship with you</li>
            <li>To improve our website, products/services, marketing, or customer relationships</li>
            <li>To make recommendations to you about goods or services that may be of interest to you</li>
            <li>To comply with a legal or regulatory obligation</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-montserrat font-semibold text-beacon-navy mb-4">4. DATA SECURITY</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
          <p className="mb-4">
            We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-montserrat font-semibold text-beacon-navy mb-4">5. YOUR LEGAL RIGHTS</h2>
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Withdraw consent</li>
          </ul>
          <p className="mb-4">
            If you wish to exercise any of the rights set out above, please contact us at privacy@beaconai.ai.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-montserrat font-semibold text-beacon-navy mb-4">6. CONTACT US</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>Beacon AI Consulting LLC</p>
            <p>Email: privacy@beaconai.ai</p>
            <p>Phone: (720) 249-1174</p>
          </div>
        </section>
      </div>
    </div>
  );
}
