import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const tips = [
  { bold: 'Focus Keyphrase:', text: 'Choose one main keyphrase per page (e.g., "iata certification online")' },
  { bold: 'Keyphrase Placement:', text: 'Include in title, first paragraph, headings, meta, and URL' },
  { bold: 'Keyword Density:', text: 'Aim for 1-2% - use naturally without stuffing' },
  { bold: null, text: 'Use proper industry terms (DGR, IATA, IMDG, Hazmat, 49 CFR)' },
  { bold: null, text: 'Reference specific regulations and training categories' },
  { bold: null, text: 'Emphasize compliance, safety, and certification validity' },
  { bold: null, text: 'Target logistics professionals and compliance officers' },
  { bold: null, text: 'Use specifics: "24-month validity", "9 classes", "Category 6"' },
];

export function TDGTips() {
  return (
    <Card style={{ borderLeft: '4px solid #FF8C42' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base" style={{ color: '#1C7C7C' }}>
          <Lightbulb className="w-5 h-5" style={{ color: '#FF8C42' }} />
          Dangerous Goods SEO Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-2 font-medium" style={{ color: '#2C3E50' }}>
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: '#FF8C42' }} className="font-black">&bull;</span>
              <span>
                {tip.bold && <strong>{tip.bold}</strong>} {tip.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
