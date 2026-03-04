'use client';

interface BookingButtonProps {
  url?: string;
  label?: string;
  className?: string;
}

export function CalendlyButton({
  url = 'https://app.usemotion.com/meet/dalemyska/consultation',
  label = 'Book 30-Minute Call',
  className = 'inline-block bg-beacon-gold text-beacon-navy px-8 py-4 text-lg font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300',
}: BookingButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
