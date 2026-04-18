import { Button } from "@/components/ui/button";
import type { Service, Settings } from "@/hooks/useVenueData";

const reserveLink = (whatsapp: string, title: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Hi 2nd Baze Garden — I'd like to enquire about ${title}.`,
  )}`;

export const Services = ({ services, settings }: { services: Service[]; settings: Settings | null }) => {
  if (!services.length) return null;
  const wa = settings?.whatsapp || "";
  return (
    <section id="services" className="bg-background py-12 md:py-20">
      <div className="container max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">What we offer</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">Services</h2>
          <p className="mt-3 text-muted-foreground">
            From intimate hangouts to full-blown celebrations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
            >
              {s.emoji && <span className="text-3xl">{s.emoji}</span>}
              <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
              {s.description && <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 w-full border-accent/50 hover:bg-accent hover:text-accent-foreground"
              >
                <a href={reserveLink(wa, s.title)} target="_blank" rel="noreferrer">
                  Reserve via WhatsApp
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
