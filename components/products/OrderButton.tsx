"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/orders";
import { generateWhatsAppLink } from "@/lib/utils";

interface OrderButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  inStock: boolean;
}

export function OrderButton({ productId, productName, productPrice, inStock }: OrderButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleOrder = async () => {
    if (!inStock || isPending) return;
    setIsPending(true);
    try {
      const { whatsappUrl } = await createOrder({
        productId,
        productName,
        productPrice,
        quantity: 1,
      });
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback: open WhatsApp without order number if DB fails
      window.open(
        generateWhatsAppLink(productName, productPrice, 1),
        "_blank",
        "noopener,noreferrer"
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="whatsapp"
      size="xl"
      className="w-full rounded-full text-sm shadow-lg shadow-[#25D366]/20"
      disabled={!inStock || isPending}
      onClick={handleOrder}
    >
      <MessageCircle className="h-5 w-5" />
      {isPending ? "جاري التسجيل..." : "اطلبي عبر واتساب"}
    </Button>
  );
}
