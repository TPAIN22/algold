import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/lib/actions/categories";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export const metadata = { title: "الفئات" };

export default async function AdminCategoriesPage() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">الفئات</h1>
          <p className="text-muted-foreground mt-1">{categories.length} فئة</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/categories/new">
            <Plus className="h-4 w-4" />
            إضافة فئة
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {categories.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3 text-center">
            <Tags className="h-12 w-12 text-gold/30" />
            <p className="font-semibold text-foreground">لا توجد فئات بعد</p>
            <p className="text-sm text-muted-foreground">أنشئ فئات لتنظيم منتجاتك</p>
            <Button variant="gold" size="sm" asChild className="mt-2">
              <Link href="/admin/categories/new">
                <Plus className="h-4 w-4" />
                إضافة فئة
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">الصورة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>المعرف</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-end">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream border border-border flex items-center justify-center shrink-0">
                      {category.image_url ? (
                        <Image src={category.image_url} alt={category.name} width={48} height={48} className="object-cover w-full h-full" />
                      ) : (
                        <Tags className="h-5 w-5 text-gold/30" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground" dir="ltr">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(category.created_at).toLocaleDateString("ar-SA")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/categories/${category.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteCategoryButton id={category.id} name={category.name} />
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
