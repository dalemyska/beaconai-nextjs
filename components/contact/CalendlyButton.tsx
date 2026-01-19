'use client';

export function CalendlyButton() {
  const handleCallClick = () => {
    window.open('https://calendly.com/dalemyska/ai-strategy', '_blank');
  };

  return (
    <button
      onClick={handleCallClick}
      className="inline-block bg-beacon-gold text-beacon-navy px-8 py-4 text-lg font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300"
    >
      Book 30-Minute Call
    </button>
  );
}
