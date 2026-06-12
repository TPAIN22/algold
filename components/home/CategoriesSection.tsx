import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { getCategories } from "@/lib/actions/categories";

const categoryIcons = ["✦", "◈", "❋", "◆", "✿", "❄"];
const categoryColors = [
  "from-gold/5 to-gold/15",
  "from-gold/10 to-gold/20",
  "from-gold/5 to-gold/10",
  "from-gold/15 to-gold/25",
  "from-gold/8 to-gold/18",
  "from-gold/12 to-gold/22",
];

export async function CategoriesSection() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    // Supabase not configured yet
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section id="categories" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-xs tracking-[0.3em] text-gold font-medium">
              تصفحي حسب النوع
            </span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            فئاتنا
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            اجدي أسلوبك المثالي من فئاتنا المنسقة بعناية
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div
                className={`relative overflow-hidden rounded-xl border border-gold/20 aspect-square flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/40 hover:-translate-y-1 ${category.image_url ? "" : `bg-gradient-to-br ${categoryColors[i % categoryColors.length]} p-6 md:p-8`}`}
              >
                {category.image_url ? (
                  <>
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    <h3 className="relative font-serif font-semibold text-white text-lg drop-shadow">
                      {category.name}
                    </h3>
                  </>
                ) : (
                  <>
                    <span className="text-3xl mb-3 text-gold group-hover:scale-110 transition-transform duration-300">
                      {categoryIcons[i % categoryIcons.length]}
                    </span>
                    <h3 className="font-serif font-semibold text-foreground text-lg group-hover:text-gold transition-colors duration-200">
                      {category.name}
                    </h3>
                  </>
                )}
                <div className="absolute bottom-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-gold" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
