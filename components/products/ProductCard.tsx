"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappLink = generateWhatsAppLink(product.name, product.price, 1);

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-border hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300">
      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/5] bg-cream flex items-center justify-center relative overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gold/30">
              <Package className="h-12 w-12" />
              <span className="text-xs">لا توجد صورة</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
              <Eye className="h-3 w-3" />
              عرض التفاصيل
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 end-3 flex flex-col gap-1.5">
          {product.featured && (
            <Badge variant="gold" className="text-[10px]">مميز</Badge>
          )}
          {!product.in_stock && (
            <Badge variant="destructive" className="text-[10px]">نفدت الكمية</Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif font-semibold text-foreground hover:text-gold transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <span className="font-serif font-bold text-lg text-gold" dir="ltr">
            {formatPrice(product.price)}
          </span>
          {product.in_stock ? (
            <span className="text-[10px] text-green-600">متوفر</span>
          ) : (
            <span className="text-[10px] text-muted-foreground">غير متوفر</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="gold-outline"
            size="sm"
            className="flex-1 rounded-full text-[10px]"
            asChild
          >
            <Link href={`/products/${product.slug}`}>
              <Eye className="h-3 w-3" />
              التفاصيل
            </Link>
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            className="flex-1 rounded-full text-[10px]"
            disabled={!product.in_stock}
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-3 w-3" />
              اطلبي
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
