import { Suspense } from "react";
import { Package } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

async function ProductsGrid({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  let products = [];
  try {
    products = await getProducts({ categorySlug: searchParams.category, search: searchParams.search });
  } catch {}

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
        <Package className="h-16 w-16 text-gold/30 mb-4" />
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">لا توجد منتجات</h3>
        <p className="text-muted-foreground max-w-sm">
          {searchParams.search || searchParams.category
            ? "جربي تعديل البحث أو الفلاتر."
            : "ستظهر المنتجات هنا بمجرد إضافتها من لوحة الإدارة."}
        </p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

function ProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/5] rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  let categories = [];
  try {
    categories = await getCategories();
  } catch {}

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 min-h-screen bg-white">
        {/* Header */}
        <div className="bg-cream border-b border-border py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-gold/50" />
              <span className="text-xs tracking-[0.3em] text-gold font-medium">متجرنا</span>
              <div className="h-px w-8 bg-gold/50" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              جميع المجموعات
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="mb-8">
            <Suspense fallback={<Skeleton className="h-20 rounded-lg" />}>
              <ProductFilters categories={categories} />
            </Suspense>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<ProductsSkeleton />}>
              <ProductsGrid searchParams={params} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
