import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProducts } from "@/lib/actions/products";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "./DeleteProductButton";

export const metadata = { title: "المنتجات" };

export default async function AdminProductsPage() {
  let products = [];
  try { products = await getProducts(); } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">المنتجات</h1>
          <p className="text-muted-foreground mt-1">{products.length} منتج</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/products/new"><Plus className="h-4 w-4" />إضافة منتج</Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {products.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3 text-center">
            <Package className="h-12 w-12 text-gold/30" />
            <p className="font-semibold text-foreground">لا توجد منتجات بعد</p>
            <p className="text-sm text-muted-foreground">أضف منتجك الأول للبدء</p>
            <Button variant="gold" size="sm" asChild className="mt-2">
              <Link href="/admin/products/new"><Plus className="h-4 w-4" />إضافة منتج</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">الصورة</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-end">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream border border-border flex items-center justify-center shrink-0">
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.name} width={48} height={48} className="object-cover w-full h-full" />
                      ) : (
                        <Package className="h-5 w-5 text-gold/30" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                      {product.featured && <Badge variant="gold" className="mt-1 text-[10px]">مميز</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{product.categories?.name ?? "—"}</TableCell>
                  <TableCell className="font-semibold text-gold" dir="ltr">{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <Badge variant={product.in_stock ? "success" : "destructive"}>
                      {product.in_stock ? "متوفر" : "غير متوفر"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                      </Button>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
