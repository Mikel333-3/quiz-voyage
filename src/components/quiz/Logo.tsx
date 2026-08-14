import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, withIcon = true }: { className?: string; withIcon?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 font-display font-black tracking-widest", className)}>
      {withIcon && (
        <span className="relative grid place-items-center">
          <span className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-md animate-glow-pulse" />
          <Brain className="size-[1.15em] text-accent" strokeWidth={1.6} />
        </span>
      )}
      <span className="whitespace-nowrap">
        QUIZ<span className="text-gradient">TIME</span>
      </span>
    </span>
  );
}
