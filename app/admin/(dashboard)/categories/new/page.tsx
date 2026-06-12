import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "@/lib/actions/categories";

export const metadata = { title: "إضافة فئة جديدة" };

async function createCategoryAction(_: unknown, formData: FormData) {
  "use server";
  try {
    await createCategory(formData);
    return {};
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export default function NewCategoryPage() {
  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          رجوع
        </Link>
      </div>

      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">إضافة فئة جديدة</h1>
        <p className="text-muted-foreground mt-1">أنشئ فئة جديدة لتنظيم منتجاتك</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 md:p-8">
        <CategoryForm action={createCategoryAction} submitLabel="إضافة الفئة" />
      </div>
    </div>
  );
}
