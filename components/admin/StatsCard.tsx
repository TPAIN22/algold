import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, description, className }: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-border p-6 flex items-start gap-4", className)}>
      <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="font-serif text-3xl font-bold text-foreground mt-0.5">{value}</p>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  );
}
