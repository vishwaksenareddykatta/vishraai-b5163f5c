export function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[oklch(0.78_0.18_215/0.18)] blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[oklch(0.45_0.22_265/0.25)] blur-3xl" />
    </div>
  );
}

export function Orb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.78_0.18_215)] to-[oklch(0.45_0.22_265)] blur-2xl opacity-60 animate-pulse-glow" />
      <div className="relative h-full w-full rounded-full glass-strong overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-white/20 blur-2xl" />
      </div>
    </div>
  );
}
