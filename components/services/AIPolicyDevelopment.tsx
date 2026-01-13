import PolicyDevelopmentHero from "./policy/PolicyDevelopmentHero";
import PolicyBenefits from "./policy/PolicyBenefits";
import PolicyProcess from "./policy/PolicyProcess";
import PolicyOutcomes from "./policy/PolicyOutcomes";
import PolicyCTA from "./policy/PolicyCTA";

const AIPolicyDevelopment = () => {
  return (
    <section id="policy" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container-custom">
        <PolicyDevelopmentHero />
        <PolicyBenefits />
        <PolicyProcess />
        <PolicyOutcomes />
        <PolicyCTA />
      </div>
    </section>
  );
};

export default AIPolicyDevelopment;
