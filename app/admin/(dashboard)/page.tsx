import { Package, Tags, Star, CheckCircle, ShoppingCart, Bell } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { getDashboardStats } from "@/lib/actions/products";

export const metadata = { title: "لوحة التحكم" };

export default async function AdminDashboardPage() {
  let stats = { totalProducts: 0, totalCategories: 0, featuredProducts: 0, availableProducts: 0, totalOrders: 0, newOrders: 0 };
  try { stats = await getDashboardStats(); } catch {}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground mt-1">مرحباً بك في لوحة إدارة  الجولد للثياب للثياب</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatsCard title="إجمالي الطلبات" value={stats.totalOrders} icon={ShoppingCart} description="جميع الطلبات الواردة" />
        <StatsCard title="طلبات جديدة" value={stats.newOrders} icon={Bell} description="تنتظر المتابعة عبر واتساب" />
        <StatsCard title="إجمالي المنتجات" value={stats.totalProducts} icon={Package} description="جميع المنتجات في المتجر" />
        <StatsCard title="الفئات" value={stats.totalCategories} icon={Tags} description="فئات المنتجات" />
        <StatsCard title="المنتجات المميزة" value={stats.featuredProducts} icon={Star} description="معروضة في الصفحة الرئيسية" />
        <StatsCard title="المتوفرة" value={stats.availableProducts} icon={CheckCircle} description="متوفرة حالياً في المخزن" />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { href: "/admin/orders",       label: "عرض الطلبات",    icon: ShoppingCart },
            { href: "/admin/products/new", label: "إضافة منتج جديد", icon: Package },
            { href: "/admin/categories/new", label: "إضافة فئة",    icon: Tags },
            { href: "/products",           label: "عرض المتجر",     icon: Star },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-gold/40 hover:bg-cream transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon className="h-4 w-4 text-gold" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Info card */}
      <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
        <h3 className="font-serif font-semibold text-foreground mb-2">للبدء</h3>
        <ul className="text-sm text-foreground/70 space-y-1.5 list-disc list-inside">
          <li>أضف الفئات أولاً، ثم أنشئ المنتجات</li>
          <li>ضع علامة "مميز" على المنتجات لعرضها في الصفحة الرئيسية</li>
          <li>ارفع صوراً واضحة وعالية الجودة للحصول على أفضل النتائج</li>
          <li>سيتواصل العملاء معك عبر واتساب لإتمام الطلبات</li>
        </ul>
      </div>
    </div>
  );
}
