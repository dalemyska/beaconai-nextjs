import { BookOpen } from "lucide-react";

const ServiceHeader = () => {
  return (
    <header className="bg-gradient-to-br from-beacon-navy to-beacon-navy/95 text-white py-10 md:py-20 pt-16 md:pt-24 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-beacon-gold/10 rounded-full blur-md animate-float-slow"></div>
        <div className="absolute top-2/3 right-10 w-16 h-16 bg-beacon-teal/10 rounded-full blur-md animate-float-medium"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-beacon-gold/5 rounded-full blur-md animate-float-fast"></div>

        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            AI Implementation Services
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-blue-100 mb-8">
            Building AI-Ready Organizations That Drive Results
          </h2>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <div className="w-8 h-8 rounded-full bg-beacon-gold/90 flex items-center justify-center mr-3">
                <BookOpen className="h-4 w-4 text-beacon-navy" />
              </div>
              <span className="text-white font-medium">MIT-Influenced Approach</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <div className="w-8 h-8 rounded-full bg-beacon-gold/90 flex items-center justify-center mr-3">
                <svg className="h-4 w-4 text-beacon-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-medium">Results-Driven</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <div className="w-8 h-8 rounded-full bg-beacon-gold/90 flex items-center justify-center mr-3">
                <svg className="h-4 w-4 text-beacon-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-medium">Practical Implementation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,12.34,100.91,24,151.36,35.56S251.81,57.76,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </header>
  );
};

export default ServiceHeader;
