import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ACCENTS = {
  primary: "text-primary",
  success: "text-success",
  violet: "text-violet",
  warning: "text-warning",
  haiti: "text-haiti",
  accent: "text-accent",
} as const;

export type AccentKey = keyof typeof ACCENTS;

export function Panel({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("glass rounded-3xl", glow && "glow-ring", className)}>{children}</div>
  );
}

export function SectionTitle({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-end justify-between gap-3", className)}>
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      {action}
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "tap relative w-full overflow-hidden rounded-2xl bg-[image:var(--gradient-primary)] px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground",
        "shadow-[var(--glow-strong)] disabled:opacity-50",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-primary-foreground/20 blur-md animate-sweep" />
      <span className="relative">{children}</span>
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "tap glass w-full rounded-2xl px-5 py-3.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StatTile({
  label,
  value,
  icon,
  accent = "accent",
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  accent?: AccentKey;
}) {
  return (
    <Panel className="p-3 sm:p-4">
      {icon && <div className={cn("mb-1.5", ACCENTS[accent])}>{icon}</div>}
      <p className="font-display text-lg font-bold leading-none sm:text-2xl">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </Panel>
  );
}

export function XpBar({ percent, className }: { percent: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}>
      <div
        className="h-full rounded-full bg-[image:var(--gradient-primary)] shadow-[var(--glow-strong)] transition-[width] duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="glass flex rounded-2xl p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cn(
            "tap flex-1 rounded-xl px-3 py-2 font-display text-xs font-bold uppercase tracking-wider",
            value === t
              ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
              : "text-muted-foreground",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.slice(0, 2).toUpperCase();
  const hue = (name.charCodeAt(0) * 13) % 360;
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border border-border font-display text-xs font-bold"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 25%, oklch(0.55 0.16 ${hue}), oklch(0.25 0.06 265))`,
      }}
    >
      {initials}
    </span>
  );
}
