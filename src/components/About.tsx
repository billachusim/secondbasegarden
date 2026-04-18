import { Clock, MapPin, Phone } from "lucide-react";
import { venue } from "@/data/menu";

export const About = () => (
  <section id="about" className="bg-secondary/40 py-12 md:py-20">
    <div className="container max-w-5xl">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">About Us</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">
            A garden made for good times.
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Tucked along DBS Road in Asaba, 2nd Baze Garden is the city's
            go-to spot for sizzling grills, cold drinks and unforgettable
            nights. Whether it's an after-work hangout or a weekend turn-up,
            our garden is open round the clock for you.
          </p>

          <div className="mt-6 space-y-3">
            <InfoRow icon={MapPin} label="Address" value={venue.address} />
            <InfoRow icon={Clock} label="Hours" value={venue.hours} />
            <InfoRow icon={Phone} label="Phone" value={venue.phone} href={`tel:${venue.phone}`} />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-elegant">
          <iframe
            title="2nd Baze Garden location map"
            src={venue.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full md:h-96"
          />
        </div>
      </div>
    </div>
  </section>
);

const InfoRow = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}) => {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block transition-smooth hover:text-accent">{inner}</a> : inner;
};
