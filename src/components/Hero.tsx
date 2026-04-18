import fallbackHero from "@/assets/hero-garden.jpg";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";
import type { Settings } from "@/hooks/useVenueData";

export const Hero = ({ settings }: { settings: Settings | null }) => {
  const hero = settings?.hero_image_url || fallbackHero;
  const name = settings?.venue_name || "2nd Baze Garden";
  const tagline = settings?.tagline || "";
  const mapsLink = settings?.maps_link || "#";

  return (
    <header className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
      <img
        src={hero}
        alt={`${name} lounge ambience`}
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 gradient-hero" />

      <div className="container max-w-5xl pb-12 pt-20 text-primary-foreground md:pb-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground shadow-soft">
          <Clock className="h-3.5 w-3.5" /> Open 24 Hours
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl md:text-7xl">
          {name}
        </h1>
        <p className="mt-4 max-w-xl text-base text-primary-foreground/90 drop-shadow md:text-lg">
          {tagline}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent-glow">
            <a href="#menu">View Menu</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-primary-foreground/40 bg-background/10 px-7 text-primary-foreground backdrop-blur hover:bg-background/20 hover:text-primary-foreground"
          >
            <a href={mapsLink} target="_blank" rel="noreferrer">
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
