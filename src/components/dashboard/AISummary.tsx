import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

type Language = 'en' | 'hi';

interface PageSummary {
  en: {
    title: string;
    summary: string;
    insights: string[];
  };
  hi: {
    title: string;
    summary: string;
    insights: string[];
  };
}

const pageSummaries: Record<string, PageSummary> = {
  '/': {
    en: {
      title: 'Dashboard Overview',
      summary: 'This dashboard gives you a complete picture of your sales performance across all regions. The KPI cards show real-time numbers including store count, product availability, and cooler compliance scores.',
      insights: [
        'Store availability is at 87.3% - above the 85% target',
        'Cooler purity score of 78.5% means there is room for improvement',
        '3 stores need immediate attention for missing coolers',
      ],
    },
    hi: {
      title: 'डैशबोर्ड ओवरव्यू',
      summary: 'यह डैशबोर्ड आपको सभी रीजन्स में सेल्स परफॉर्मेंस की पूरी तस्वीर दिखाता है। KPI कार्ड्स में स्टोर काउंट, प्रोडक्ट अवेलेबिलिटी और कूलर कंप्लायंस स्कोर रियल-टाइम में दिखते हैं।',
      insights: [
        'स्टोर अवेलेबिलिटी 87.3% है - 85% टारगेट से ऊपर',
        'कूलर प्योरिटी स्कोर 78.5% है, इसमें सुधार की जरूरत है',
        '3 स्टोर्स में कूलर मिसिंग है, तुरंत ध्यान दें',
      ],
    },
  },
  '/stores': {
    en: {
      title: 'Store Performance Analysis',
      summary: 'This view shows all stores in your network with their performance numbers. Use filters to find underperforming stores or focus on specific regions.',
      insights: [
        'Top performing stores are mostly in urban areas',
        'Rural stores show 12% lower availability on average',
        'Click on any store row for detailed breakdown',
      ],
    },
    hi: {
      title: 'स्टोर परफॉर्मेंस एनालिसिस',
      summary: 'यहाँ आपके नेटवर्क के सभी स्टोर्स उनके परफॉर्मेंस नंबर्स के साथ दिख रहे हैं। कमजोर स्टोर्स ढूंढने के लिए फ़िल्टर यूज़ करें।',
      insights: [
        'टॉप परफॉर्मिंग स्टोर्स ज्यादातर शहरी एरिया में हैं',
        'ग्रामीण स्टोर्स में एवरेज 12% कम अवेलेबिलिटी है',
        'डीटेल देखने के लिए किसी भी स्टोर पर क्लिक करें',
      ],
    },
  },
  '/regions': {
    en: {
      title: 'Regional Performance Summary',
      summary: 'Compare performance across different regions. This helps identify regional trends and allocate resources effectively.',
      insights: [
        'North region leads with 92% target achievement',
        'West region needs attention - 15% below quarterly target',
        'Regional comparison helps optimize territory planning',
      ],
    },
    hi: {
      title: 'रीजनल परफॉर्मेंस समरी',
      summary: 'अलग-अलग रीजन्स का परफॉर्मेंस यहाँ कंपेयर करें। इससे रीजनल ट्रेंड्स समझने और रिसोर्सेज सही जगह लगाने में मदद मिलती है।',
      insights: [
        'नॉर्थ रीजन 92% टारगेट अचीवमेंट के साथ आगे है',
        'वेस्ट रीजन पर ध्यान दें - क्वार्टरली टारगेट से 15% पीछे',
        'रीजनल कम्पेरिज़न से टेरिटरी प्लानिंग बेहतर होती है',
      ],
    },
  },
  '/coolers': {
    en: {
      title: 'Cooler Purity Analysis',
      summary: 'Monitor cooler compliance across your network. Impure coolers have competitor products and affect brand visibility. Focus on stores with purity below 50% first.',
      insights: [
        'Average purity of 78.5% is below the 85% benchmark',
        '12 stores have critical purity levels (below 50%)',
        'Regular audits can improve purity scores by 15-20%',
      ],
    },
    hi: {
      title: 'कूलर प्योरिटी एनालिसिस',
      summary: 'अपने नेटवर्क में कूलर कंप्लायंस मॉनिटर करें। इम्प्योर कूलर में कॉम्पिटिटर प्रोडक्ट्स होते हैं जो ब्रांड विज़िबिलिटी को कम करते हैं। पहले 50% से कम प्योरिटी वाले स्टोर्स पर फोकस करें।',
      insights: [
        'एवरेज प्योरिटी 78.5% है जो 85% बेंचमार्क से कम है',
        '12 स्टोर्स में प्योरिटी लेवल क्रिटिकल है (50% से कम)',
        'रेगुलर ऑडिट से प्योरिटी स्कोर 15-20% बढ़ सकता है',
      ],
    },
  },
  '/missing-coolers': {
    en: {
      title: 'Missing Cooler Tracking',
      summary: 'Find stores without cooler installations. Missing coolers mean lost brand visibility and sales opportunities. Prioritize high-traffic stores for new installations.',
      insights: [
        '8 stores currently without cooler installations',
        'Estimated revenue loss: ₹45,000/month from missing coolers',
        'Installation requests pending approval for 3 locations',
      ],
    },
    hi: {
      title: 'मिसिंग कूलर ट्रैकिंग',
      summary: 'बिना कूलर वाले स्टोर्स यहाँ देखें। मिसिंग कूलर का मतलब है ब्रांड विज़िबिलिटी और सेल्स का नुकसान। हाई-ट्रैफिक स्टोर्स में पहले इंस्टॉलेशन कराएं।',
      insights: [
        'अभी 8 स्टोर्स में कूलर नहीं लगा है',
        'मिसिंग कूलर से अनुमानित नुकसान: ₹45,000/महीना',
        '3 लोकेशन के लिए इंस्टॉलेशन रिक्वेस्ट अप्रूवल में है',
      ],
    },
  },
  '/metrics': {
    en: {
      title: 'Performance Metrics Deep Dive',
      summary: 'Detailed analytics on all key performance indicators. Use these metrics to track progress against targets and find improvement opportunities.',
      insights: [
        'Week-over-week growth is positive at 3.2%',
        'Conversion rate improved by 8% after recent training',
        'Peak performance hours are 2PM-6PM across regions',
      ],
    },
    hi: {
      title: 'परफॉर्मेंस मेट्रिक्स डीप डाइव',
      summary: 'सभी key परफॉर्मेंस इंडिकेटर्स की डीटेल्ड एनालिटिक्स। टारगेट के against प्रोग्रेस ट्रैक करने और इम्प्रूवमेंट के मौके ढूंढने के लिए इन मेट्रिक्स का यूज़ करें।',
      insights: [
        'वीक-ओवर-वीक ग्रोथ 3.2% पॉज़िटिव है',
        'रीसेंट ट्रेनिंग के बाद कन्वर्ज़न रेट में 8% सुधार हुआ',
        'सभी रीजन्स में पीक परफॉर्मेंस टाइम 2PM-6PM है',
      ],
    },
  },
  '/availability': {
    en: {
      title: 'Product Availability Dashboard',
      summary: 'Track product availability across all SKUs and stores. High availability means happy customers and maximum sales.',
      insights: [
        'Overall availability at 87.3% - target is 90%',
        'Coca-Cola 500ml shows lowest availability at 72%',
        'Weekend restocking improves availability by 5-8%',
      ],
    },
    hi: {
      title: 'प्रोडक्ट अवेलेबिलिटी डैशबोर्ड',
      summary: 'सभी SKUs और स्टोर्स में प्रोडक्ट अवेलेबिलिटी ट्रैक करें। ज्यादा अवेलेबिलिटी का मतलब है खुश कस्टमर और ज्यादा सेल्स।',
      insights: [
        'ओवरऑल अवेलेबिलिटी 87.3% है - टारगेट 90% है',
        'Coca-Cola 500ml में सबसे कम अवेलेबिलिटी 72% है',
        'वीकेंड पर रीस्टॉकिंग से अवेलेबिलिटी 5-8% बढ़ती है',
      ],
    },
  },
};

interface AISummaryProps {
  currentPath: string;
  className?: string;
}

export function AISummary({ currentPath, className }: AISummaryProps) {
  const [language, setLanguage] = useState<Language>('en');
  
  const summary = pageSummaries[currentPath] || pageSummaries['/'];
  const content = summary[language];

  return (
    <Card className={cn('border-primary/20 bg-gradient-to-br from-primary/5 to-transparent', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">
              {language === 'en' ? 'AI Insights' : 'AI अंतर्दृष्टि'}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            <Button
              variant={language === 'en' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setLanguage('en')}
            >
              <Languages className="mr-1 h-3 w-3" />
              EN
            </Button>
            <Button
              variant={language === 'hi' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setLanguage('hi')}
            >
              हिंदी
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground">{content.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {content.summary}
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">
            {language === 'en' ? 'Key Insights:' : 'मुख्य अंतर्दृष्टि:'}
          </h5>
          <ul className="space-y-1.5">
            {content.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
