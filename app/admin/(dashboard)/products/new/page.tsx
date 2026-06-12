import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/actions/categories";
import { createProduct } from "@/lib/actions/products";

export const metadata = { title: "إضافة منتج جديد" };

async function createProductAction(_: unknown, formData: FormData) {
  "use server";
  try {
    await createProduct(formData);
    return {};
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export default async function NewProductPage() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {}

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
        <h1 className="font-serif text-3xl font-bold text-foreground">إضافة منتج جديد</h1>
        <p className="text-muted-foreground mt-1">أدخل تفاصيل المنتج لإضافته إلى المتجر</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 md:p-8">
        <ProductForm
          categories={categories}
          action={createProductAction}
          submitLabel="إضافة المنتج"
        />
      </div>
    </div>
  );
}
