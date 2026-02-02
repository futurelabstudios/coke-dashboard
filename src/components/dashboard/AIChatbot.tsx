import { useState, useRef, useEffect } from 'react';
// Coca-Cola India Sales Intelligence - AI Assistant
// Built by Futurelab Studios
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  'default': "I'm your AI assistant for sales analytics. I can help you understand store performance, cooler compliance, regional trends, and more. What would you like to know?",
  'store': "Based on the current data, your top-performing stores are in urban areas with an average availability score of 92%. The stores requiring attention are mainly in rural regions where cooler maintenance visits are less frequent. Would you like me to identify specific stores that need immediate action?",
  'cooler': "Cooler purity is a critical metric. Currently, 12 stores have purity below 50%, which means competitor products are taking up significant shelf space. I recommend prioritizing visits to these stores. The main culprits are local beverage brands being stocked without authorization.",
  'availability': "Product availability across your network is at 87.3%. The SKUs with lowest availability are Coca-Cola 500ml (72%) and Sprite 1L (78%). These gaps are primarily due to supply chain delays in the western region. Consider increasing safety stock levels for these products.",
  'performance': "This week shows a 3.2% improvement in overall sales compared to last week. The improvement is driven by better cooler compliance in the North region. However, the West region is underperforming by 15% against quarterly targets.",
  'help': "I can help you with:\n• Store performance analysis\n• Cooler purity and compliance\n• Product availability insights\n• Regional performance comparison\n• Identifying stores needing attention\n\nJust ask me anything about your sales data!",
  'region': "Regional performance varies significantly. North leads at 92% target achievement, followed by South at 88%. West region is struggling at 85% below target, primarily due to cooler compliance issues. I recommend focusing field team efforts on the western territory.",
  'target': "Based on current trends, you're on track to meet 94% of your monthly target. To close the gap, focus on the 12 critical stores with low cooler purity - improving these alone could add 3-4% to your target achievement.",
};

function getMockResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('store') || lowerInput.includes('shop')) {
    return mockResponses['store'];
  }
  if (lowerInput.includes('cooler') || lowerInput.includes('purity') || lowerInput.includes('fridge')) {
    return mockResponses['cooler'];
  }
  if (lowerInput.includes('availability') || lowerInput.includes('stock') || lowerInput.includes('product')) {
    return mockResponses['availability'];
  }
  if (lowerInput.includes('performance') || lowerInput.includes('sales') || lowerInput.includes('growth')) {
    return mockResponses['performance'];
  }
  if (lowerInput.includes('help') || lowerInput.includes('what can you')) {
    return mockResponses['help'];
  }
  if (lowerInput.includes('region') || lowerInput.includes('area') || lowerInput.includes('territory')) {
    return mockResponses['region'];
  }
  if (lowerInput.includes('target') || lowerInput.includes('goal') || lowerInput.includes('achieve')) {
    return mockResponses['target'];
  }
  
  return mockResponses['default'];
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hello! I'm your AI sales assistant. I can help you understand your dashboard data, identify trends, and provide actionable insights. Try asking me about store performance, cooler purity, or regional trends!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Which stores need attention?",
    "How is cooler purity trending?",
    "What's my target achievement?",
  ];

  // Floating button when closed - prominent at bottom center on mobile
  if (!isOpen) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-screen-xl mx-auto px-4 pb-4 sm:pb-6 flex justify-center sm:justify-end pointer-events-auto">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 px-6 sm:h-16 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 gap-3"
          >
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-semibold text-sm sm:text-base">Ask AI Assistant</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'fixed z-50 transition-all duration-300',
      'bottom-0 left-0 right-0 sm:left-auto sm:right-4 sm:bottom-4 lg:right-6 lg:bottom-6',
      'w-full sm:w-[400px] lg:w-[440px]',
      isMinimized ? 'h-16' : 'h-[90vh] sm:h-[600px]'
    )}>
      {/* Clean white container with subtle shadow */}
      <div className={cn(
        'h-full w-full bg-card rounded-none sm:rounded-2xl overflow-hidden',
        'border-t sm:border border-border',
        'shadow-xl sm:shadow-2xl'
      )}>
        {/* Header - Bold red accent */}
        <div className="relative flex items-center justify-between p-4 bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-display font-bold">AI Sales Assistant</h3>
              {!isMinimized && (
                <p className="text-[10px] text-primary-foreground/80">Powered by Coca-Cola India</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-primary-foreground/20 text-primary-foreground"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-primary-foreground/20 text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex h-[calc(100%-72px)] flex-col bg-background">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3 animate-fade-in',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3 text-sm',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-muted text-foreground rounded-bl-md'
                      )}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggested questions */}
            {messages.length <= 2 && (
              <div className="border-t border-border px-4 py-3 bg-muted/30">
                <p className="mb-2.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Quick questions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs rounded-full border-border bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input - Clean and prominent */}
            <div className="border-t border-border p-4 bg-card">
              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your sales data..."
                  className="flex-1 bg-muted border-0 focus:ring-2 focus:ring-primary/20 rounded-full h-12 px-5"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
