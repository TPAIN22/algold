import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrders } from "@/lib/actions/orders";
import { formatPrice } from "@/lib/utils";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { DeleteOrderButton } from "./DeleteOrderButton";

export const metadata = { title: "الطلبات" };

const STATUS_BADGE: Record<string, { label: string; variant: "default" | "success" | "destructive" | "gold" | "outline" }> = {
  new:       { label: "جديد",         variant: "gold" },
  contacted: { label: "تم التواصل",   variant: "outline" },
  confirmed: { label: "مؤكد",         variant: "default" },
  shipped:   { label: "تم الشحن",     variant: "default" },
  delivered: { label: "تم التسليم",   variant: "success" },
  cancelled: { label: "ملغي",          variant: "destructive" },
};

export default async function AdminOrdersPage() {
  let orders: Awaited<ReturnType<typeof getOrders>> = [];
  try { orders = await getOrders(); } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">الطلبات</h1>
          <p className="text-muted-foreground mt-1">{orders.length} طلب</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3 text-center">
            <ShoppingCart className="h-12 w-12 text-gold/30" />
            <p className="font-semibold text-foreground">لا توجد طلبات بعد</p>
            <p className="text-sm text-muted-foreground">ستظهر الطلبات هنا عندما يضغط العملاء على زر واتساب</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead className="text-end">حذف</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const badge = STATUS_BADGE[order.status] ?? { label: order.status, variant: "outline" as const };
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      #{order.order_number}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground line-clamp-1">{order.product_name}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">{formatPrice(order.product_price)} × {order.quantity}</p>
                    </TableCell>
                    <TableCell className="text-sm">{order.quantity}</TableCell>
                    <TableCell className="font-semibold text-gold" dir="ltr">
                      {formatPrice(order.total_price)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                        <OrderStatusSelect id={order.id} status={order.status} />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("ar-SA", {
                        year: "numeric", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-end">
                      <DeleteOrderButton id={order.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
