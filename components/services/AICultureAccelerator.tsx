import CultureHero from "./culture/CultureHero";
import CultureDeliverables from "./culture/CultureDeliverables";
import CultureProcess from "./culture/CultureProcess";
import CultureOutcomes from "./culture/CultureOutcomes";
import CultureCTA from "./culture/CultureCTA";

const AICultureAccelerator = () => {
  return (
    <section id="culture" className="py-20 bg-white scroll-mt-20">
      <div className="container-custom">
        <CultureHero />
        <CultureDeliverables />
        <CultureProcess />
        <CultureOutcomes />
        <CultureCTA />
      </div>
    </section>
  );
};

export default AICultureAccelerator;
