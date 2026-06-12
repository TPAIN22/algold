import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "الجولد للثياب | أزياء سودانية فاخرة",
    template: "%s | الجولد للثياب",
  },
  description:
    "متجر الجولد للثياب للأزياء السودانية الفاخرة. نقدم أفضل الأزياء النسائية السودانية الأصيلة للمرأة العصرية في المملكة العربية السعودية ودول الخليج.",
  keywords: [
    "أزياء سودانية",
    "ثوب سوداني",
    "ملابس نسائية",
    "الجولد للثياب",
    "Al Gold",
    "Sudanese fashion",
  ],
  openGraph: {
    title: "الجولد للثياب | أزياء سودانية فاخرة",
    description: "متجر الجولد للثياب للأزياء السودانية الفاخرة",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
