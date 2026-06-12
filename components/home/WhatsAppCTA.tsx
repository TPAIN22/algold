import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppCTA() {
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/5 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/5 -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-8">
          <MessageCircle className="h-10 w-10 text-[#25D366]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          مستعدة للطلب؟
        </h2>
        <p className="font-serif text-xl text-gold/70 mb-4">
          Ready to Order?
        </p>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          تواصلي معنا مباشرة عبر واتساب لتقديم طلبكِ أو الاستفسار أو طلب تصميم مخصص. نحن هنا لنجعلكِ تبدين في أبهى صورة.
        </p>

        {/* Phone number display */}
        <div className="inline-flex items-center gap-3 bg-white border border-gold/20 rounded-full px-6 py-3 mb-8 shadow-sm" dir="ltr">
          <Phone className="h-4 w-4 text-gold" />
          <span className="font-semibold text-foreground tracking-wide">
            +966 563 963 954
          </span>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="whatsapp"
            size="xl"
            className="rounded-full min-w-[250px] text-sm shadow-lg shadow-[#25D366]/20"
            asChild
          >
            <a
              href="https://wa.me/966563963954"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              تواصلي عبر واتساب
            </a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          متاحة السبت – الخميس · 9 صباحاً – 10 مساءً بتوقيت السعودية
        </p>
      </div>
    </section>
  );
}
