import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/vishra-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, source: "footer" });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.success("You're already subscribed.");
      else toast.error("Could not subscribe. Try again.");
      return;
    }
    toast.success("Subscribed. Welcome to Vishra signal.");
    setEmail("");
  };

  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Vishra AI" className="h-9 w-9" loading="lazy" decoding="async" />
              <span className="font-display text-lg font-semibold">Vishra<span className="text-glow"> AI</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Engineering autonomous intelligence systems for modern businesses. A division of NexVark Industries.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 glass rounded-full p-1 flex items-center max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button disabled={loading} className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-60">
                {loading ? "…" : "Subscribe"}
              </button>
            </form>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/solutions" className="hover:text-foreground">Solutions</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><a href="https://www.nexvarkindustries.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">NexVark Industries</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vishra AI · NexVark Industries. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
