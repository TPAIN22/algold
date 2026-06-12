import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, CheckCircle, XCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getProducts } from "@/lib/actions/products";
import { OrderButton } from "@/components/products/OrderButton";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };
  return { title: product.name, description: product.description ?? undefined };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  let relatedProducts = [];
  try {
    relatedProducts = await getProducts({ categorySlug: product.categories?.slug, limit: 4 });
    relatedProducts = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);
  } catch {}

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-gold transition-colors">المجموعات</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-xs">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-cream border border-border">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gold/30">
                    <Package className="h-16 w-16 mb-3" />
                    <span className="text-xs">لا توجد صورة</span>
                  </div>
                )}
              </div>
              <div className="absolute top-4 end-4 flex flex-col gap-2">
                {product.featured && <Badge variant="gold">مميز</Badge>}
              </div>
            </div>

            {/* Info */}
            <div className="sticky top-24">
              {product.categories && (
                <Link
                  href={`/products?category=${product.categories.slug}`}
                  className="text-xs text-gold hover:text-gold-dark transition-colors font-medium"
                >
                  {product.categories.name}
                </Link>
              )}

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-4xl font-bold text-gold" dir="ltr">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                {product.in_stock ? (
                  <><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm text-green-600 font-medium">متوفر في المخزن</span></>
                ) : (
                  <><XCircle className="h-4 w-4 text-red-400" /><span className="text-sm text-red-500 font-medium">غير متوفر حالياً</span></>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8 pb-6 border-b border-border">
                  <h2 className="font-serif font-semibold text-foreground mb-2">الوصف</h2>
                  <p className="text-foreground/70 leading-relaxed text-sm">{product.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <OrderButton
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                  inStock={product.in_stock}
                />

                <Button variant="gold-outline" size="lg" className="w-full rounded-full text-sm" asChild>
                  <Link href="/products">
                    <ArrowRight className="h-4 w-4" />
                    العودة للمجموعات
                  </Link>
                </Button>
              </div>

              {/* WhatsApp info */}
              <div className="mt-6 p-4 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl">
                <p className="text-xs text-foreground/60 leading-relaxed">
                  عند النقر على "اطلبي عبر واتساب" سيتم فتح واتساب مع رسالة جاهزة تحتوي على تفاصيل المنتج. سيرد فريقنا بسرعة لإتمام طلبكِ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border bg-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl font-bold text-foreground">قد يعجبكِ أيضاً</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
