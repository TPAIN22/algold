import { Shield, Truck, MessageCircle, Star, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "جودة فائقة",
    description: "كل قطعة يتم فحصها بعناية لضمان أعلى معايير الجودة والحرفية.",
  },
  {
    icon: Heart,
    title: "أزياء سودانية أصيلة",
    description: "أزياء سودانية حقيقية من تصميم حرفيات ماهرات باستخدام تقنيات تقليدية متوارثة.",
  },
  {
    icon: MessageCircle,
    title: "دعم عبر واتساب",
    description: "اطلبي وتواصلي مباشرة عبر واتساب للحصول على تجربة تسوق سلسة ومريحة.",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "شحن سريع وموثوق إلى جميع مناطق المملكة العربية السعودية ودول الخليج.",
  },
  {
    icon: Star,
    title: "تصاميم حصرية",
    description: "أساليب فريدة لن تجديها في أي مكان آخر — مختارة حصرياً لالجولد للثياب.",
  },
  {
    icon: Sparkles,
    title: "طلبات مخصصة",
    description: "اطلبي مقاسات وألواناً وتطريزات مخصصة لتجعلي قطعتك فريدة من نوعها.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-white overflow-hidden">
      <div className="h-px gold-gradient mb-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-xs tracking-[0.3em] text-gold font-medium">
              لماذا الجولد للثياب
            </span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            ما يميّز الجولد للثياب
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            نتجاوز حدود الأزياء — نقدم تجربة تحتفي بجمالكِ وتراثكِ
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl border border-white/10 hover:border-gold/40 bg-white/5 hover:bg-white/8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors duration-200">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
