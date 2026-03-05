import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    id: 'cost',
    question: 'How much does this cost?',
    answer:
      'Every engagement starts with a free AI Readiness Assessment and a 30-minute strategy call. From there, services range from one-time strategy sessions to ongoing fractional AI leadership. I will give you a clear scope and investment before any commitment.',
  },
  {
    id: 'small-company',
    question: 'We are a small company. Is AI really for us?',
    answer:
      'That is exactly who I work with. Small and mid-sized businesses with 10-500 employees are my focus. You do not need enterprise budgets or a technical team. You need the right strategy for your size.',
  },
  {
    id: 'tried-ai',
    question: 'We tried AI tools and they did not stick. Can you help?',
    answer:
      'This is one of the most common problems I solve. Most AI failures are not about the technology. They are about change management, unclear goals, or skipping the strategy step. I help businesses get unstuck and get results from what they have already invested in.',
  },
  {
    id: 'timeline',
    question: 'How long does an AI implementation take?',
    answer:
      'It depends on scope, but most clients see initial results within 30-60 days. I focus on quick wins first to build momentum, then scale from there.',
  },
  {
    id: 'replace-tools',
    question: 'Do you replace our existing tools or team?',
    answer:
      'No. I work with what you have. The goal is to make your current team more effective, not to replace them. AI should handle the repetitive work so your people can focus on higher-value tasks.',
  },
  {
    id: 'industries',
    question: 'What industries do you work with?',
    answer:
      "I specialize in franchise organizations, professional service firms, and SMB operations teams. My background includes 15+ years of operations leadership at companies like PostNet and MBE Worldwide, plus completion of MIT's AI Executive Academy.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-beacon-navy mb-12 text-center">
          Common Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-lg font-semibold text-beacon-navy hover:no-underline [&[data-state=open]>svg]:text-beacon-teal">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
