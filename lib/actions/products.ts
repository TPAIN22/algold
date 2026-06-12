"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/product";

export async function getProducts(options?: {
  featured?: boolean;
  categorySlug?: string;
  search?: string;
  limit?: number;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (options?.featured) query = query.eq("featured", true);
  if (options?.categorySlug)
    query = query.eq("categories.slug", options.categorySlug);
  if (options?.search) query = query.ilike("name", `%${options.search}%`);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  let imageUrl: string | null = null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile, { contentType: imageFile.type });
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);
    imageUrl = urlData.publicUrl;
  }

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    category_id: (formData.get("category_id") as string) || null,
    in_stock: formData.get("in_stock") === "true",
    featured: formData.get("featured") === "true",
    image_url: imageUrl,
  };

  const categoryId = raw.category_id === "none" ? null : raw.category_id;
  const validated = productSchema.parse({ ...raw, category_id: categoryId });
  const { error } = await supabase.from("products").insert(validated);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  let imageUrl = formData.get("existing_image_url") as string | null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile, { contentType: imageFile.type });
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);
    imageUrl = urlData.publicUrl;

    // Delete old image
    const oldImageUrl = formData.get("existing_image_url") as string;
    if (oldImageUrl) {
      const oldFileName = oldImageUrl.split("/").pop();
      if (oldFileName)
        await supabase.storage.from("products").remove([oldFileName]);
    }
  }

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    category_id: (formData.get("category_id") as string) || null,
    in_stock: formData.get("in_stock") === "true",
    featured: formData.get("featured") === "true",
    image_url: imageUrl,
  };

  const categoryId = raw.category_id === "none" ? null : raw.category_id;
  const validated = productSchema.parse({ ...raw, category_id: categoryId });
  const { error } = await supabase
    .from("products")
    .update(validated)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  if (product?.image_url) {
    const fileName = product.image_url.split("/").pop();
    if (fileName) await supabase.storage.from("products").remove([fileName]);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function getDashboardStats() {
  const supabase = await createClient();
  const [products, categories, orders] = await Promise.all([
    supabase.from("products").select("id, featured, in_stock"),
    supabase.from("categories").select("id"),
    supabase.from("orders").select("id, status"),
  ]);

  return {
    totalProducts: products.data?.length ?? 0,
    totalCategories: categories.data?.length ?? 0,
    featuredProducts: products.data?.filter((p) => p.featured).length ?? 0,
    availableProducts: products.data?.filter((p) => p.in_stock).length ?? 0,
    totalOrders: orders.data?.length ?? 0,
    newOrders: orders.data?.filter((o) => o.status === "new").length ?? 0,
  };
}
