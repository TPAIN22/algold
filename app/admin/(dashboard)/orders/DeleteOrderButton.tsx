"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/lib/actions/orders";

export function DeleteOrderButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm("هل أنتِ متأكدة من حذف هذا الطلب؟")) return;
    setPending(true);
    try {
      await deleteOrder(id);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={pending}
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
