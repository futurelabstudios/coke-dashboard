import { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Language = 'en' | 'hi' | 'hinglish';

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
  hinglish: {
    title: string;
    summary: string;
    insights: string[];
  };
}

const pageSummaries: Record<string, PageSummary> = {
  '/': {
    en: {
      title: 'Dashboard Overview',
      summary: 'Complete picture of your sales performance across all regions. KPI cards show real-time store count, product availability, and cooler compliance scores.',
      insights: [
        'Store availability is at 87.3% - above the 85% target',
        'Cooler purity score of 78.5% needs improvement',
        '3 stores need immediate attention for missing coolers',
      ],
    },
    hi: {
      title: 'डैशबोर्ड ओवरव्यू',
      summary: 'सभी रीजन्स में सेल्स परफॉर्मेंस की पूरी तस्वीर। KPI कार्ड्स में स्टोर काउंट, प्रोडक्ट अवेलेबिलिटी और कूलर कंप्लायंस स्कोर रियल-टाइम में दिखते हैं।',
      insights: [
        'स्टोर अवेलेबिलिटी 87.3% है - 85% टारगेट से ऊपर',
        'कूलर प्योरिटी स्कोर 78.5% है, सुधार की जरूरत',
        '3 स्टोर्स में कूलर मिसिंग है, तुरंत ध्यान दें',
      ],
    },
    hinglish: {
      title: 'Dashboard Overview',
      summary: 'Yeh dashboard aapko saari regions mein sales performance ki complete picture deta hai. KPI cards mein store count, availability aur cooler scores real-time mein dikhte hain.',
      insights: [
        'Store availability 87.3% hai - 85% target se upar',
        'Cooler purity score 78.5% hai, improvement ki zaroorat hai',
        '3 stores mein cooler missing hai, turant dhyan do',
      ],
    },
  },
  '/stores': {
    en: {
      title: 'Store Performance Analysis',
      summary: 'All stores with their performance numbers. Use filters to find underperforming stores or focus on specific regions.',
      insights: [
        'Top performing stores are mostly in urban areas',
        'Rural stores show 12% lower availability on average',
        'Click on any store row for detailed breakdown',
      ],
    },
    hi: {
      title: 'स्टोर परफॉर्मेंस एनालिसिस',
      summary: 'सभी स्टोर्स उनके परफॉर्मेंस नंबर्स के साथ। कमजोर स्टोर्स ढूंढने के लिए फ़िल्टर यूज़ करें।',
      insights: [
        'टॉप परफॉर्मिंग स्टोर्स ज्यादातर शहरी एरिया में हैं',
        'ग्रामीण स्टोर्स में एवरेज 12% कम अवेलेबिलिटी है',
        'डीटेल देखने के लिए किसी भी स्टोर पर क्लिक करें',
      ],
    },
    hinglish: {
      title: 'Store Performance Analysis',
      summary: 'Yahaan aapke network ke saare stores unke performance numbers ke saath dikh rahe hain. Weak stores dhundne ke liye filters use karo.',
      insights: [
        'Top performing stores mostly urban areas mein hain',
        'Rural stores mein average 12% kam availability hai',
        'Details ke liye kisi bhi store pe click karo',
      ],
    },
  },
  '/regions': {
    en: {
      title: 'Regional Performance Summary',
      summary: 'Compare performance across regions to identify trends and allocate resources effectively.',
      insights: [
        'North region leads with 92% target achievement',
        'West region needs attention - 15% below target',
        'Regional comparison helps optimize planning',
      ],
    },
    hi: {
      title: 'रीजनल परफॉर्मेंस समरी',
      summary: 'अलग-अलग रीजन्स का परफॉर्मेंस कंपेयर करें। ट्रेंड्स समझने में मदद मिलती है।',
      insights: [
        'नॉर्थ रीजन 92% टारगेट अचीवमेंट के साथ आगे है',
        'वेस्ट रीजन पर ध्यान दें - टारगेट से 15% पीछे',
        'रीजनल कम्पेरिज़न से प्लानिंग बेहतर होती है',
      ],
    },
    hinglish: {
      title: 'Regional Performance Summary',
      summary: 'Alag-alag regions ka performance yahaan compare karo. Isse trends samajhne mein help milti hai.',
      insights: [
        'North region 92% target achievement ke saath lead kar raha hai',
        'West region pe dhyan do - target se 15% peeche',
        'Regional comparison se planning better hoti hai',
      ],
    },
  },
  '/coolers': {
    en: {
      title: 'Cooler Purity Analysis',
      summary: 'Monitor cooler compliance. Impure coolers affect brand visibility. Focus on stores with purity below 50% first.',
      insights: [
        'Average purity of 78.5% is below 85% benchmark',
        '12 stores have critical purity levels (below 50%)',
        'Regular audits can improve scores by 15-20%',
      ],
    },
    hi: {
      title: 'कूलर प्योरिटी एनालिसिस',
      summary: 'कूलर कंप्लायंस मॉनिटर करें। इम्प्योर कूलर ब्रांड विज़िबिलिटी को कम करते हैं।',
      insights: [
        'एवरेज प्योरिटी 78.5% है जो 85% बेंचमार्क से कम है',
        '12 स्टोर्स में प्योरिटी लेवल क्रिटिकल है',
        'रेगुलर ऑडिट से स्कोर 15-20% बढ़ सकता है',
      ],
    },
    hinglish: {
      title: 'Cooler Purity Analysis',
      summary: 'Apne network mein cooler compliance monitor karo. Impure coolers brand visibility ko affect karte hain.',
      insights: [
        'Average purity 78.5% hai jo 85% benchmark se kam hai',
        '12 stores mein purity level critical hai (50% se neeche)',
        'Regular audits se purity score 15-20% badh sakta hai',
      ],
    },
  },
  '/missing-coolers': {
    en: {
      title: 'Missing Cooler Tracking',
      summary: 'Stores without cooler installations. Missing coolers mean lost brand visibility and sales opportunities.',
      insights: [
        '8 stores currently without cooler installations',
        'Estimated revenue loss: ₹45,000/month',
        'Installation requests pending for 3 locations',
      ],
    },
    hi: {
      title: 'मिसिंग कूलर ट्रैकिंग',
      summary: 'बिना कूलर वाले स्टोर्स। मिसिंग कूलर का मतलब है ब्रांड विज़िबिलिटी और सेल्स का नुकसान।',
      insights: [
        '8 स्टोर्स में कूलर नहीं लगा है',
        'अनुमानित नुकसान: ₹45,000/महीना',
        '3 लोकेशन के लिए रिक्वेस्ट अप्रूवल में है',
      ],
    },
    hinglish: {
      title: 'Missing Cooler Tracking',
      summary: 'Bina cooler wale stores yahaan dekho. Missing cooler ka matlab hai brand visibility aur sales ka loss.',
      insights: [
        'Abhi 8 stores mein cooler nahi laga hai',
        'Missing coolers se estimated loss: ₹45,000/month',
        '3 locations ke liye installation request approval mein hai',
      ],
    },
  },
  '/metrics': {
    en: {
      title: 'Performance Metrics Deep Dive',
      summary: 'Detailed analytics on all KPIs. Track progress against targets and find improvement opportunities.',
      insights: [
        'Week-over-week growth is positive at 3.2%',
        'Conversion rate improved by 8% after training',
        'Peak performance hours are 2PM-6PM',
      ],
    },
    hi: {
      title: 'परफॉर्मेंस मेट्रिक्स डीप डाइव',
      summary: 'सभी KPIs की डीटेल्ड एनालिटिक्स। टारगेट के against प्रोग्रेस ट्रैक करें।',
      insights: [
        'वीक-ओवर-वीक ग्रोथ 3.2% पॉज़िटिव है',
        'ट्रेनिंग के बाद कन्वर्ज़न रेट में 8% सुधार हुआ',
        'पीक परफॉर्मेंस टाइम 2PM-6PM है',
      ],
    },
    hinglish: {
      title: 'Performance Metrics Deep Dive',
      summary: 'Saare KPIs ki detailed analytics. Target ke against progress track karne ke liye yeh use karo.',
      insights: [
        'Week-over-week growth 3.2% positive hai',
        'Training ke baad conversion rate mein 8% improvement hua',
        'Peak performance time 2PM-6PM hai',
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
      summary: 'सभी SKUs और स्टोर्स में प्रोडक्ट अवेलेबिलिटी ट्रैक करें।',
      insights: [
        'ओवरऑल अवेलेबिलिटी 87.3% है - टारगेट 90% है',
        'Coca-Cola 500ml में सबसे कम अवेलेबिलिटी 72% है',
        'वीकेंड रीस्टॉकिंग से अवेलेबिलिटी 5-8% बढ़ती है',
      ],
    },
    hinglish: {
      title: 'Product Availability Dashboard',
      summary: 'Saare SKUs aur stores mein product availability track karo. Zyada availability ka matlab hai khush customers.',
      insights: [
        'Overall availability 87.3% hai - target 90% hai',
        'Coca-Cola 500ml mein sabse kam availability 72% hai',
        'Weekend pe restocking se availability 5-8% badhti hai',
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
    <div className={cn(
      'relative rounded-2xl overflow-hidden animate-fade-in',
      'bg-white/70 backdrop-blur-xl border border-white/50',
      'shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]',
      className
    )}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative p-4">
        {/* Header - Compact for mobile */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-bold text-foreground">
                {language === 'en' ? 'Summary' : 'सारांश'}
              </h3>
              <p className="text-[10px] text-muted-foreground">AI Insights</p>
            </div>
          </div>
          
          {/* Language Dropdown */}
          <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
            <SelectTrigger className="w-[120px] h-9 text-xs bg-white border-border/50 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="en" className="text-sm">🇬🇧 English</SelectItem>
              <SelectItem value="hinglish" className="text-sm">🇮🇳 Hinglish</SelectItem>
              <SelectItem value="hi" className="text-sm">🇮🇳 हिंदी</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content - Optimized for mobile readability */}
        <div className="space-y-3">
          {/* Title and Summary */}
          <div className="p-3 rounded-xl bg-white/60 backdrop-blur border border-white/40 shadow-sm">
            <h4 className="font-display font-semibold text-foreground text-sm mb-1">{content.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {content.summary}
            </p>
          </div>
          
          {/* Key Insights - Horizontal scroll on mobile for space efficiency */}
          <div>
            <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="h-1 w-3 rounded-full bg-primary" />
              {language === 'en' ? 'Key Insights' : 'मुख्य जानकारी'}
            </h5>
            <div className="space-y-1.5">
              {content.insights.map((insight, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2.5 text-xs text-muted-foreground p-2.5 rounded-lg bg-white/50 backdrop-blur border border-white/30"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="flex-1 leading-relaxed">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
