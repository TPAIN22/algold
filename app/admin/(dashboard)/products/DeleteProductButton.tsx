"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/lib/actions/products";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProduct(id);
      toast({ title: "تم حذف المنتج بنجاح" });
      setOpen(false);
      router.refresh();
    } catch (e) {
      toast({
        title: "خطأ",
        description: (e as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حذف المنتج</DialogTitle>
          <DialogDescription>
            هل أنتِ متأكدة من حذف{" "}
            <strong className="text-foreground">"{name}"</strong>؟ لا يمكن التراجع عن هذا الإجراء وسيتم حذف صورة المنتج أيضاً.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" />جاري الحذف...</>
            ) : (
              "حذف"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
