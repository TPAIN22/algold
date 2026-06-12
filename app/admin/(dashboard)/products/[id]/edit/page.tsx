import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/actions/categories";
import { updateProduct } from "@/lib/actions/products";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "تعديل المنتج" };

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  let categories = [];
  try {
    categories = await getCategories();
  } catch {}

  async function updateProductAction(_: unknown, formData: FormData) {
    "use server";
    try {
      await updateProduct(id, formData);
      return {};
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          رجوع
        </Link>
      </div>

      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">تعديل المنتج</h1>
        <p className="text-muted-foreground mt-1 font-medium">{product.name}</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 md:p-8">
        <ProductForm
          product={product}
          categories={categories}
          action={updateProductAction}
          submitLabel="حفظ التعديلات"
        />
      </div>
    </div>
  );
}
