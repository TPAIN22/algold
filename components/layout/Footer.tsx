import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="h-1 gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <h2 className="font-serif text-3xl font-bold text-gold">
                الجولد للثياب
              </h2>
              <p className="font-serif text-gold/70 text-sm tracking-widest mt-1">
                AL GOLD
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              أزياء سودانية أصيلة مصنوعة للمرأة العصرية. الأناقة والتراث والفخامة — في مكان واحد.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-gold text-sm tracking-widest uppercase mb-5">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/products", label: "المجموعات" },
                { href: "/#categories", label: "الفئات" },
                { href: "/#about", label: "من نحن" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-gold text-sm tracking-widest uppercase mb-5">
              تواصلي معنا
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/966563963954"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-gold text-sm transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors flex-shrink-0">
                    <Phone className="h-3.5 w-3.5 text-[#25D366]" />
                  </span>
                  966 563 963 954+
                </a>
              </li>
              <li>
                <a
                  href="mailto:algold@email.com"
                  className="flex items-center gap-3 text-white/60 hover:text-gold text-sm transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors flex-shrink-0">
                    <Mail className="h-3.5 w-3.5 text-gold" />
                  </span>
                  algold@email.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                </span>
                المملكة العربية السعودية ودول الخليج
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-start">
            © {new Date().getFullYear()} الجولد للثياب. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/966563963954"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/30 flex items-center justify-center transition-colors text-white/70 hover:text-white text-xs font-bold"
              aria-label="واتساب"
            >
              WA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
