import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { updateCategory } from "@/lib/actions/categories";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "تعديل الفئة" };

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (!category) notFound();

  async function updateCategoryAction(_: unknown, formData: FormData) {
    "use server";
    try {
      await updateCategory(id, formData);
      return {};
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

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
        <h1 className="font-serif text-3xl font-bold text-foreground">تعديل الفئة</h1>
        <p className="text-muted-foreground mt-1">{category.name}</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 md:p-8">
        <CategoryForm
          category={category}
          action={updateCategoryAction}
          submitLabel="حفظ التعديلات"
        />
      </div>
    </div>
  );
}
