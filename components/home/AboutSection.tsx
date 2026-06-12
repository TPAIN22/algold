export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Decorative panel */}
          <div className="relative order-2 md:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-cream to-gold/5 border border-gold/20 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">✦</div>
                  <div className="font-serif text-5xl font-bold text-gold/80 mb-2">
                    الجولد للثياب
                  </div>
                  <div className="font-serif text-2xl text-gold/50 tracking-widest">AL GOLD</div>
                  <div className="mt-6 grid grid-cols-3 gap-3 opacity-40">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="w-full aspect-square rounded-sm bg-gold/20" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -start-6 bg-foreground text-white rounded-xl p-5 shadow-xl w-44">
                <div className="text-3xl font-bold text-gold font-serif mb-1">100%</div>
                <div className="text-xs text-white/70 leading-tight">أزياء سودانية أصيلة</div>
              </div>

              {/* Floating stats */}
              <div className="absolute -top-4 -end-4 bg-white rounded-xl p-4 shadow-lg border border-gold/20">
                <div className="text-xl font-bold text-gold font-serif">ريال</div>
                <div className="text-xs text-muted-foreground">أفضل الأسعار</div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold/50" />
              <span className="text-xs tracking-[0.3em] text-gold font-medium">
                قصتنا
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              أزياء مستوحاة من{" "}
              <span className="gold-text-gradient">الإرث السوداني</span>
            </h2>

            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                وُلد الجولد للثياب من حب عميق للثقافة السودانية ورؤية واضحة لإيصال الأزياء الأصيلة إلى المرأة السودانية المقيمة في المملكة العربية السعودية ودول الخليج.
              </p>
              <p>
                نُقدم أرقى الأزياء السودانية — من الأثواب المطرزة بالذهب والعبايات الفاخرة إلى القطع المعاصرة التي تمزج بين الأصالة والحداثة — كل قطعة تحكي قصة حرفية وفخر بالهوية.
              </p>
              <p>
                كل قطعة في مجموعتنا مختارة بعناية لضمان الجودة والأصالة والمزج المثالي بين التراث والأناقة العصرية.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: "+500", label: "عميلة سعيدة" },
                { value: "+100", label: "تصميم فريد" },
                { value: "5★", label: "التقييم" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-2xl font-bold text-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
