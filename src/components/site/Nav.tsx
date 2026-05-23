import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/vishra-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl glass rounded-full transition-all duration-500 ${
          scrolled ? "py-2 px-3 shadow-[0_8px_40px_oklch(0_0_0/0.6)]" : "py-3 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 pl-2">
            <img src={logo} alt="Vishra AI logo" width={32} height={32} decoding="async" fetchPriority="high" className="h-8 w-8 object-contain drop-shadow-[0_0_12px_oklch(0.78_0.18_215/0.6)]" />
            <span className="font-display text-base font-semibold tracking-tight">
              Vishra<span className="text-glow"> AI</span>
            </span>
          </Link>
          <ul className="hidden md:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="px-3 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: "px-3 py-2 rounded-full text-foreground bg-white/5" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link
              to="/discovery"
              title="Request Intelligence Mapping — leads to booking your discovery session"
              className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]"
            >
              Request Intelligence Mapping
            </Link>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="md:hidden glass rounded-full h-10 w-10 inline-flex items-center justify-center text-foreground"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden mt-3 mx-auto max-w-6xl glass-strong rounded-3xl p-2"
          style={{ backgroundColor: "oklch(0.08 0.02 270 / 0.98)" }}
        >
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-5 py-4 min-h-[52px] text-base text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-2xl transition-colors"
                  activeProps={{ className: "flex items-center justify-between px-5 py-4 min-h-[52px] text-base text-foreground bg-white/5 rounded-2xl" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  <span>{l.label}</span>
                  <span className="text-muted-foreground/60">→</span>
                </Link>
                {i < links.length - 1 && <div className="h-px bg-white/5 mx-5" />}
              </li>
            ))}
          </ul>
          <div className="p-3 pt-4">
            <Link
              to="/discovery"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full rounded-full bg-primary text-primary-foreground px-5 py-3.5 text-sm font-medium shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]"
            >
              Request Intelligence Mapping
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
