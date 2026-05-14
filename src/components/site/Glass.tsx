import { type ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`glass rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ${
        glow ? "hover:shadow-[0_0_40px_oklch(0.78_0.18_215/0.35)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      {eyebrow && (
        <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-semibold text-gradient leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="pt-28 pb-16">{children}</main>;
}
