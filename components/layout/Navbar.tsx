"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المجموعات" },
  { href: "/#categories", label: "الفئات" },
  { href: "/#about", label: "من نحن" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-row items-center gap-3 group">
            <img src="/logo.svg" alt="logo" width={120} height={120} className="mt-10" />
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-gold-dark leading-none group-hover:text-gold transition-colors duration-200">
                الجولد للثياب
              </span>
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase leading-none mt-0.5">
                AL GOLD
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-gold transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="gold"
              size="sm"
              className="hidden md:flex items-center gap-2 rounded-full text-xs"
              asChild
            >
              <a
                href="https://wa.me/966563963954"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                اطلبي الآن
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-foreground/70 hover:text-gold transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="القائمة"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gold/20 bg-white">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm text-foreground/70 hover:text-gold hover:bg-cream rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                variant="gold"
                size="sm"
                className="w-full rounded-full text-xs"
                asChild
              >
                <a
                  href="https://wa.me/966563963954"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="h-3.5 w-3.5 me-2" />
                  اطلبي عبر واتساب
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
