import { venue } from "@/data/menu";

export const Footer = () => (
  <footer className="border-t border-border bg-background py-10">
    <div className="container max-w-5xl">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <div className="font-display text-xl font-bold">{venue.name}</div>
          <p className="mt-2 text-sm text-muted-foreground">{venue.tagline}</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Visit us</div>
          <p className="mt-2 text-muted-foreground">{venue.address}</p>
          <p className="mt-1 text-muted-foreground">{venue.hours}</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Contact</div>
          <a href={`tel:${venue.phone}`} className="mt-2 block text-muted-foreground hover:text-accent">
            {venue.phone}
          </a>
          <a
            href={`https://wa.me/${venue.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-muted-foreground hover:text-accent"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {venue.name}. All rights reserved.
      </div>
    </div>
  </footer>
);
