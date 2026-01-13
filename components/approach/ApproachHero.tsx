const ApproachHero = () => {
  return (
    <section className="bg-gradient-to-br from-beacon-navy to-beacon-navy/95 text-white py-10 md:py-20 pt-16 md:pt-24 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-beacon-gold/10 rounded-full blur-md animate-float-slow"></div>
        <div className="absolute top-2/3 right-10 w-16 h-16 bg-beacon-teal/10 rounded-full blur-md animate-float-medium"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-beacon-gold/5 rounded-full blur-md animate-float-fast"></div>

        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Approach</h1>
          <div className="h-1 w-32 bg-beacon-gold mx-auto mb-8"></div>
          <h2 className="text-xl md:text-2xl text-white font-medium">Building AI-Ready Organizations</h2>
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,12.34,100.91,24,151.36,35.56S251.81,57.76,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default ApproachHero;
