import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl glass rounded-full transition-all duration-500 ${
          scrolled ? "py-2 px-3 shadow-[0_8px_40px_oklch(0_0_0/0.6)]" : "py-3 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 pl-2">
            <img src={logo} alt="Vishra AI logo" className="h-8 w-8 object-contain drop-shadow-[0_0_12px_oklch(0.78_0.18_215/0.6)]" />
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
              to="/contact"
              className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]"
            >
              Request Mapping
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              className="md:hidden glass rounded-full px-3 py-2 text-sm"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {open && (
          <ul className="md:hidden mt-3 flex flex-col gap-1 px-2 pb-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
