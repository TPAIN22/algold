import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-gold/10" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-gold/15" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-gold/10" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-gold/15" />
        <div className="absolute top-1/4 left-10 w-px h-40 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-1/4 right-10 w-px h-40 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-gold/40" />
        <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 rounded-full bg-gold/40" />
        <div className="absolute top-1/2 left-16 w-1 h-1 rounded-full bg-gold/30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-3 mb-8 animate-fade-in">
          <div className="h-px w-12 bg-gold" />
          <span className="text-xs tracking-[0.3em] text-gold font-medium">
            أزياء سودانية فاخرة
          </span>
          <div className="h-px w-12 bg-gold" />
        </div>

        {/* Main heading */}
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-3 animate-fade-up">
          <span className="gold-text-gradient">الجولد للثياب</span>
        </h1>

        {/* Latin subtitle */}
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold/70 mb-6 animate-fade-up tracking-widest"
          style={{ animationDelay: "100ms" }}>
          AL GOLD
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          <div className="w-2 h-2 rotate-45 bg-gold/60" />
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-up"
          style={{ animationDelay: "200ms" }}>
          أناقة راقية للمرأة السودانية المعاصرة
        </p>
        <p className="font-serif text-sm text-foreground/40 tracking-wider mb-12 animate-fade-up"
          style={{ animationDelay: "250ms" }}>
          تصميم فريد · جودة فائقة · أصالة سودانية
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "300ms" }}>
          <Button
            variant="gold"
            size="xl"
            className="rounded-full min-w-[200px] text-sm"
            asChild
          >
            <Link href="/products">
              استكشفي المجموعة
              <ArrowLeft className="h-4 w-4 ms-1" />
            </Link>
          </Button>
          <Button
            variant="whatsapp"
            size="xl"
            className="rounded-full min-w-[200px] text-sm"
            asChild
          >
            <a
              href="https://wa.me/966563963954"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              اطلبي عبر واتساب
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "600ms" }}>
          <span className="text-xs tracking-[0.3em] text-foreground/30">انتقلي للأسفل</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
