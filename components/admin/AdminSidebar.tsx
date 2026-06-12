"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin",            label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders",     label: "الطلبات",  icon: ShoppingCart },
  { href: "/admin/products",   label: "المنتجات", icon: Package },
  { href: "/admin/categories", label: "الفئات",   icon: Tags },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-serif font-bold text-lg leading-none text-gold">
              الجولد للثياب
            </div>
            <div className="text-[10px] text-muted-foreground">
              لوحة الإدارة
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gold text-white shadow-sm"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-muted-foreground" asChild>
          <Link href="/" target="_blank">عرض المتجر</Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sm text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 me-2" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — on the right in RTL */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-s border-border shrink-0 min-h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 h-16 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gold flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 text-white" />
          </div>
          <span className="font-serif font-bold text-gold">الجولد للثياب</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground/70">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay — slides from the right in RTL */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute end-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
