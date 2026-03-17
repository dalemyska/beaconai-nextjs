import { Shield, FileText } from "lucide-react";

const PolicyBenefits = () => {
  const benefits = [
    {
      title: "Risk Assessment",
      icon: <Shield className="h-6 w-6 text-beacon-teal" />,
      items: [
        "AI use case evaluation",
        "Privacy and security analysis",
        "Compliance review",
        "Ethical considerations"
      ]
    },
    {
      title: "Policy Framework",
      icon: <FileText className="h-6 w-6 text-beacon-teal" />,
      items: [
        "Custom acceptable use guidelines",
        "Data handling protocols",
        "User roles and permissions",
        "Approval processes"
      ]
    },
    {
      title: "Implementation Tools",
      icon: <Shield className="h-6 w-6 text-beacon-teal" />,
      items: [
        "Policy document templates",
        "Communication materials",
        "Training resources",
        "Governance structure"
      ]
    },
    {
      title: "Adoption Support",
      icon: <Shield className="h-6 w-6 text-beacon-teal" />,
      items: [
        "Rollout planning",
        "Stakeholder briefings",
        "Policy education sessions",
        "Monitoring recommendations"
      ]
    }
  ];

  return (
    <>
      <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
        What You&apos;ll Receive
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
              {benefit.icon}
            </div>
            <h4 className="text-xl font-semibold text-beacon-navy mb-3">{benefit.title}</h4>
            <ul className="space-y-2 text-gray-600">
              {benefit.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-beacon-teal mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default PolicyBenefits;
