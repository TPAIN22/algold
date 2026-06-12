import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppLink(
  productName: string,
  price: number,
  quantity: number = 1,
  orderNumber?: number
): string {
  const phone = "966563963954";
  const message = [
    "مرحباً،",
    "",
    "أود طلب المنتج التالي:",
    "",
    orderNumber ? `رقم الطلب: #${orderNumber}` : null,
    `المنتج: ${productName}`,
    `السعر: ${formatPrice(price)}`,
    `الكمية: ${quantity}`,
    `الإجمالي: ${formatPrice(price * quantity)}`,
    "",
    "يرجى التواصل معي لإتمام الطلب.",
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
