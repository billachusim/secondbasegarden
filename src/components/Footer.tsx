import type { Settings } from "@/hooks/useVenueData";

export const Footer = ({ settings }: { settings: Settings | null }) => (
  <footer className="border-t border-border bg-background py-10">
    <div className="container max-w-5xl">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <div className="font-display text-xl font-bold">{settings?.venue_name || "2nd Baze Garden"}</div>
          {settings?.tagline && <p className="mt-2 text-sm text-muted-foreground">{settings.tagline}</p>}
        </div>
        <div className="text-sm">
          <div className="font-semibold">Visit us</div>
          {settings?.address && <p className="mt-2 text-muted-foreground">{settings.address}</p>}
          {settings?.hours && <p className="mt-1 text-muted-foreground">{settings.hours}</p>}
        </div>
        <div className="text-sm">
          <div className="font-semibold">Contact</div>
          {settings?.phone && (
            <a href={`tel:${settings.phone}`} className="mt-2 block text-muted-foreground hover:text-accent">
              {settings.phone}
            </a>
          )}
          {settings?.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-muted-foreground hover:text-accent"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {settings?.venue_name || "2nd Baze Garden"}. All rights reserved.
      </div>
    </div>
  </footer>
);
