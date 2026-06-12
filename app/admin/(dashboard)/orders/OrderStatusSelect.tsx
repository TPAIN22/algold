"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";

const STATUS_OPTIONS = [
  { value: "new",       label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "confirmed", label: "مؤكد" },
  { value: "shipped",   label: "تم الشحن" },
  { value: "delivered", label: "تم التسليم" },
  { value: "cancelled", label: "ملغي" },
];

export function OrderStatusSelect({ id, status }: { id: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleChange = async (next: string) => {
    setLoading(true);
    try {
      await updateOrderStatus(id, next);
      setCurrent(next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className="text-xs border border-border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
