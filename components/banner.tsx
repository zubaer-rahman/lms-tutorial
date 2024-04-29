import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}
const bannerVariants = cva(
  "border flex items-center w-full text-center p-4 text-sm",
  {
    variants: {
      variant: {
        warning: " bg-yellow-200/80 text-primary border-yellow-30",
        success: "border-emerald-800 bg-emerald-700 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);
const iconMap = { warning: AlertTriangle, success: CheckCircleIcon };
export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
