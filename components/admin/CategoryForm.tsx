"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/utils";
import type { Category } from "@/types";

type FormState = { error?: string } | undefined;

interface CategoryFormProps {
  category?: Category;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
}

export function CategoryForm({ category, action, submitLabel }: CategoryFormProps) {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(action, undefined);

  useEffect(() => {
    if (state && !state.error) router.push("/admin/categories");
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-5 max-w-md">
      {state?.error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{state.error}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">اسم الفئة *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={category?.name}
          placeholder="مثال: الأثواب التقليدية"
          required
          onChange={(e) => {
            const slugInput = document.getElementById("slug") as HTMLInputElement;
            if (slugInput && !category) slugInput.value = slugify(e.target.value);
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">المعرف *</Label>
        <Input id="slug" name="slug" defaultValue={category?.slug} placeholder="يُملأ تلقائياً من الاسم" required />
        <p className="text-xs text-muted-foreground">
          يُستخدم في عناوين الروابط. أحرف إنجليزية صغيرة وأرقام وشرطات فقط.
        </p>
      </div>

      <div className="space-y-2">
        <Label>صورة الفئة</Label>
        <ImageUpload name="image" currentImageUrl={category?.image_url} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="gold" disabled={isPending} className="min-w-[140px]">
          {isPending ? <><Loader2 className="h-4 w-4 animate-spin" />جاري الحفظ...</> : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>إلغاء</Button>
      </div>
    </form>
  );
}
