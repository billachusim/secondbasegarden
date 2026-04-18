import { Facebook, Instagram, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Settings } from "@/hooks/useVenueData";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.6a4.79 4.79 0 0 1-1.84-.09Z" />
  </svg>
);

export const Social = ({ settings }: { settings: Settings | null }) => (
  <section id="social" className="bg-primary py-12 text-primary-foreground md:py-20">
    <div className="container max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Stay connected</p>
      <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">Follow the vibe online</h2>
      <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
        See what's cooking, peek at upcoming events, and tag us when you visit.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {settings?.instagram && (
          <SocialBtn href={settings.instagram} label="Instagram"><Instagram className="h-5 w-5" /></SocialBtn>
        )}
        {settings?.facebook && (
          <SocialBtn href={settings.facebook} label="Facebook"><Facebook className="h-5 w-5" /></SocialBtn>
        )}
        {settings?.tiktok && (
          <SocialBtn href={settings.tiktok} label="TikTok"><TikTokIcon className="h-5 w-5" /></SocialBtn>
        )}
      </div>

      {settings?.review_link && (
        <div className="mt-8">
          <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent-glow">
            <a href={settings.review_link} target="_blank" rel="noreferrer">
              <Star className="h-4 w-4" /> Leave a Google Review
            </a>
          </Button>
        </div>
      )}
    </div>
  </section>
);

const SocialBtn = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/5 transition-smooth hover:border-accent hover:bg-accent hover:text-accent-foreground"
  >
    {children}
  </a>
);
