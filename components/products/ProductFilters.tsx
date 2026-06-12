"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  function clearAll() {
    router.push("/products");
  }

  const hasFilters = currentCategory || currentSearch;

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="بحث عن منتجات..."
          defaultValue={currentSearch}
          className="pe-10 rounded-full border-border focus:border-gold"
          onChange={(e) => {
            const value = e.target.value;
            const timeout = setTimeout(() => updateParams("search", value), 500);
            return () => clearTimeout(timeout);
          }}
        />
      </div>

      {/* Category filters */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">الفئات</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams("category", "")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
              !currentCategory
                ? "bg-gold text-white border-gold"
                : "bg-white text-foreground/70 border-border hover:border-gold/50 hover:text-gold"
            }`}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams("category", cat.slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                currentCategory === cat.slug
                  ? "bg-gold text-white border-gold"
                  : "bg-white text-foreground/70 border-border hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-muted-foreground">نشط:</span>
          {currentCategory && (
            <Badge variant="gold-outline" className="text-xs gap-1">
              {categories.find((c) => c.slug === currentCategory)?.name}
              <button onClick={() => updateParams("category", "")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {currentSearch && (
            <Badge variant="gold-outline" className="text-xs gap-1">
              "{currentSearch}"
              <button onClick={() => updateParams("search", "")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-destructive h-auto p-0 ms-1"
            onClick={clearAll}
          >
            مسح الكل
          </Button>
        </div>
      )}
    </div>
  );
}
