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
      summary: 'This dashboard provides a comprehensive view of your sales performance across all regions. The KPI cards show real-time metrics including store count, product availability, and cooler compliance scores.',
      insights: [
        'Store availability is at 87.3% - above the 85% target threshold',
        'Cooler purity score of 78.5% indicates room for improvement',
        '3 stores require immediate attention for missing coolers',
      ],
    },
    hi: {
      title: 'डैशबोर्ड अवलोकन',
      summary: 'यह डैशबोर्ड सभी क्षेत्रों में आपके बिक्री प्रदर्शन का व्यापक दृश्य प्रदान करता है। KPI कार्ड स्टोर गणना, उत्पाद उपलब्धता और कूलर अनुपालन स्कोर सहित रीयल-टाइम मेट्रिक्स दिखाते हैं।',
      insights: [
        'स्टोर उपलब्धता 87.3% पर है - 85% लक्ष्य सीमा से ऊपर',
        '78.5% का कूलर शुद्धता स्कोर सुधार की गुंजाइश दर्शाता है',
        '3 स्टोर में गायब कूलर के लिए तत्काल ध्यान देने की आवश्यकता है',
      ],
    },
  },
  '/stores': {
    en: {
      title: 'Store Performance Analysis',
      summary: 'This view displays all stores in your network with their performance metrics. Use filters to identify underperforming stores or focus on specific regions.',
      insights: [
        'Top performing stores are concentrated in urban areas',
        'Rural stores show 12% lower availability on average',
        'Click on any store row for detailed performance breakdown',
      ],
    },
    hi: {
      title: 'स्टोर प्रदर्शन विश्लेषण',
      summary: 'यह दृश्य आपके नेटवर्क के सभी स्टोर को उनके प्रदर्शन मेट्रिक्स के साथ प्रदर्शित करता है। खराब प्रदर्शन करने वाले स्टोर की पहचान करने या विशिष्ट क्षेत्रों पर ध्यान केंद्रित करने के लिए फ़िल्टर का उपयोग करें।',
      insights: [
        'शीर्ष प्रदर्शन करने वाले स्टोर शहरी क्षेत्रों में केंद्रित हैं',
        'ग्रामीण स्टोर औसतन 12% कम उपलब्धता दिखाते हैं',
        'विस्तृत प्रदर्शन विवरण के लिए किसी भी स्टोर पंक्ति पर क्लिक करें',
      ],
    },
  },
  '/regions': {
    en: {
      title: 'Regional Performance Summary',
      summary: 'Compare performance across different geographic regions. This helps identify regional trends and allocate resources effectively.',
      insights: [
        'North region leads with 92% target achievement',
        'West region requires attention - 15% below quarterly target',
        'Regional comparison helps optimize territory planning',
      ],
    },
    hi: {
      title: 'क्षेत्रीय प्रदर्शन सारांश',
      summary: 'विभिन्न भौगोलिक क्षेत्रों में प्रदर्शन की तुलना करें। यह क्षेत्रीय रुझानों की पहचान करने और संसाधनों को प्रभावी ढंग से आवंटित करने में मदद करता है।',
      insights: [
        'उत्तर क्षेत्र 92% लक्ष्य उपलब्धि के साथ अग्रणी है',
        'पश्चिम क्षेत्र पर ध्यान देने की आवश्यकता है - तिमाही लक्ष्य से 15% नीचे',
        'क्षेत्रीय तुलना क्षेत्र नियोजन को अनुकूलित करने में मदद करती है',
      ],
    },
  },
  '/coolers': {
    en: {
      title: 'Cooler Purity Analysis',
      summary: 'Monitor cooler compliance across your network. Impure coolers contain competitor products and affect brand visibility. Focus on stores with purity below 50% for immediate action.',
      insights: [
        'Average purity of 78.5% is below the 85% benchmark',
        '12 stores have critical purity levels (<50%)',
        'Regular audits improve purity scores by 15-20%',
      ],
    },
    hi: {
      title: 'कूलर शुद्धता विश्लेषण',
      summary: 'अपने नेटवर्क में कूलर अनुपालन की निगरानी करें। अशुद्ध कूलर में प्रतिस्पर्धी उत्पाद होते हैं और ब्रांड दृश्यता को प्रभावित करते हैं। तत्काल कार्रवाई के लिए 50% से कम शुद्धता वाले स्टोर पर ध्यान दें।',
      insights: [
        '78.5% की औसत शुद्धता 85% बेंचमार्क से नीचे है',
        '12 स्टोर में गंभीर शुद्धता स्तर (<50%) हैं',
        'नियमित ऑडिट शुद्धता स्कोर में 15-20% सुधार करते हैं',
      ],
    },
  },
  '/missing-coolers': {
    en: {
      title: 'Missing Cooler Tracking',
      summary: 'Identify stores without cooler installations. Missing coolers represent lost brand visibility and sales opportunities. Prioritize high-traffic stores for new installations.',
      insights: [
        '8 stores currently without cooler installations',
        'Estimated revenue loss: ₹45,000/month from missing coolers',
        'Installation requests pending approval for 3 locations',
      ],
    },
    hi: {
      title: 'गायब कूलर ट्रैकिंग',
      summary: 'बिना कूलर इंस्टॉलेशन वाले स्टोर की पहचान करें। गायब कूलर ब्रांड दृश्यता और बिक्री के अवसरों का नुकसान दर्शाते हैं। नई स्थापनाओं के लिए उच्च-ट्रैफ़िक स्टोर को प्राथमिकता दें।',
      insights: [
        'वर्तमान में 8 स्टोर बिना कूलर इंस्टॉलेशन के हैं',
        'अनुमानित राजस्व हानि: गायब कूलर से ₹45,000/माह',
        '3 स्थानों के लिए इंस्टॉलेशन अनुरोध अनुमोदन लंबित है',
      ],
    },
  },
  '/metrics': {
    en: {
      title: 'Performance Metrics Deep Dive',
      summary: 'Detailed analytics on all key performance indicators. Use these metrics to track progress against targets and identify improvement opportunities.',
      insights: [
        'Week-over-week growth is trending positive at 3.2%',
        'Conversion rate improved by 8% after recent training',
        'Peak performance hours are 2PM-6PM across regions',
      ],
    },
    hi: {
      title: 'प्रदर्शन मेट्रिक्स गहन विश्लेषण',
      summary: 'सभी प्रमुख प्रदर्शन संकेतकों पर विस्तृत विश्लेषण। लक्ष्यों के विरुद्ध प्रगति को ट्रैक करने और सुधार के अवसरों की पहचान करने के लिए इन मेट्रिक्स का उपयोग करें।',
      insights: [
        'सप्ताह-दर-सप्ताह वृद्धि 3.2% पर सकारात्मक है',
        'हाल के प्रशिक्षण के बाद रूपांतरण दर में 8% सुधार हुआ',
        'सभी क्षेत्रों में पीक प्रदर्शन घंटे दोपहर 2 बजे से शाम 6 बजे हैं',
      ],
    },
  },
  '/availability': {
    en: {
      title: 'Product Availability Dashboard',
      summary: 'Track product availability across all SKUs and stores. Maintaining high availability ensures customer satisfaction and maximizes sales potential.',
      insights: [
        'Overall availability at 87.3% - target is 90%',
        'Coca-Cola 500ml shows lowest availability at 72%',
        'Weekend restocking improves availability by 5-8%',
      ],
    },
    hi: {
      title: 'उत्पाद उपलब्धता डैशबोर्ड',
      summary: 'सभी SKU और स्टोर में उत्पाद उपलब्धता को ट्रैक करें। उच्च उपलब्धता बनाए रखना ग्राहक संतुष्टि सुनिश्चित करता है और बिक्री क्षमता को अधिकतम करता है।',
      insights: [
        'कुल उपलब्धता 87.3% पर - लक्ष्य 90% है',
        'कोका-कोला 500ml 72% पर सबसे कम उपलब्धता दिखाता है',
        'सप्ताहांत रीस्टॉकिंग उपलब्धता में 5-8% सुधार करती है',
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
