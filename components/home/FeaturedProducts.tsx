import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/actions/products";

export async function FeaturedProducts() {
  let products = [];
  try {
    products = await getProducts({ featured: true, limit: 4 });
  } catch {
    // Supabase not configured yet
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-xs tracking-[0.3em] text-gold font-medium">
              مختارة خصيصاً لكِ
            </span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            المجموعات المميزة
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            اكتشفي أكثر قطعنا حباً، المصممة خصيصاً للمرأة الراقية
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Button
            variant="gold-outline"
            size="lg"
            className="rounded-full text-sm min-w-[200px]"
            asChild
          >
            <Link href="/products">
              عرض جميع المجموعات
              <ArrowLeft className="h-4 w-4 ms-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
