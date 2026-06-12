"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/utils";
import type { Product, Category } from "@/types";

type FormState = { error?: string } | undefined;

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
}

export function ProductForm({ product, categories, action, submitLabel }: ProductFormProps) {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(action, undefined);

  useEffect(() => {
    if (state && !state.error) router.push("/admin/products");
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-6">
      {state?.error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{state.error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">اسم المنتج *</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product?.name}
            placeholder="مثال: ثوب سوداني مطرز"
            required
            onChange={(e) => {
              const slugInput = document.getElementById("slug") as HTMLInputElement;
              if (slugInput && !product) slugInput.value = slugify(e.target.value);
            }}
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">المعرف *</Label>
          <Input id="slug" name="slug" defaultValue={product?.slug} placeholder="يُملأ تلقائياً من الاسم" required />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">السعر (ريال سعودي) *</Label>
          <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue={product?.price} placeholder="250" required />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>الفئة</Label>
          <Select name="category_id" defaultValue={product?.category_id ?? undefined}>
            <SelectTrigger>
              <SelectValue placeholder="اختاري الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">بدون فئة</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          placeholder="صفي المنتج، نوع القماش، الأسلوب..."
          rows={4}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label>صورة المنتج</Label>
        <ImageUpload name="image" currentImageUrl={product?.image_url} />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="in_stock" name="in_stock" value="true" defaultChecked={product?.in_stock ?? true} />
          <Label htmlFor="in_stock" className="cursor-pointer">متوفر في المخزن</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="featured" name="featured" value="true" defaultChecked={product?.featured ?? false} />
          <Label htmlFor="featured" className="cursor-pointer">منتج مميز</Label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="gold" disabled={isPending} className="min-w-[140px]">
          {isPending ? <><Loader2 className="h-4 w-4 animate-spin" />جاري الحفظ...</> : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>إلغاء</Button>
      </div>
    </form>
  );
}
