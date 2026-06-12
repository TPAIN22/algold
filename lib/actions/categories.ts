"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { categorySchema } from "@/lib/validations/category";

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return data;
}

async function uploadCategoryImage(supabase: Awaited<ReturnType<typeof createClient>>, imageFile: File): Promise<string> {
  const fileExt = imageFile.name.split(".").pop();
  const fileName = `categories/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, imageFile, { contentType: imageFile.type });
  if (uploadError) throw new Error(uploadError.message);
  const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName);
  return urlData.publicUrl;
}

async function deleteCategoryImage(supabase: Awaited<ReturnType<typeof createClient>>, imageUrl: string) {
  const path = imageUrl.split("/storage/v1/object/public/products/").pop();
  if (path) await supabase.storage.from("products").remove([path]);
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  let imageUrl: string | null = null;
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadCategoryImage(supabase, imageFile);
  }

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    image_url: imageUrl,
  };
  const validated = categorySchema.parse(raw);
  const { error } = await supabase.from("categories").insert(validated);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/products");
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();

  let imageUrl = formData.get("existing_image_url") as string | null;
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    if (imageUrl) await deleteCategoryImage(supabase, imageUrl);
    imageUrl = await uploadCategoryImage(supabase, imageFile);
  }

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    image_url: imageUrl,
  };
  const validated = categorySchema.parse(raw);
  const { error } = await supabase
    .from("categories")
    .update(validated)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/products");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .single();
  if (category?.image_url) await deleteCategoryImage(supabase, category.image_url);
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/products");
}
