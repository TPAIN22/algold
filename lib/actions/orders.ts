"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateWhatsAppLink } from "@/lib/utils";

export async function createOrder(input: {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}) {
  const supabase = await createClient();

  const total = input.productPrice * input.quantity;
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      product_id: input.productId,
      product_name: input.productName,
      product_price: input.productPrice,
      quantity: input.quantity,
      total_price: total,
      status: "new",
    })
    .select("order_number")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/orders");

  const whatsappUrl = generateWhatsAppLink(
    input.productName,
    input.productPrice,
    input.quantity,
    order.order_number
  );

  return { whatsappUrl };
}

export async function getOrders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, products(name, image_url)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getOrderStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, status");
  if (error) return { totalOrders: 0, newOrders: 0 };
  return {
    totalOrders: data.length,
    newOrders: data.filter((o) => o.status === "new").length,
  };
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}

export async function updateOrderNotes(id: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ notes })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}

export async function deleteOrder(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}
