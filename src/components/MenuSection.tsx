import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatNaira, type Category, type MenuItem } from "@/hooks/useVenueData";

const tagStyles: Record<string, string> = {
  new: "bg-success text-success-foreground",
  spicy: "bg-destructive text-destructive-foreground",
  popular: "bg-accent text-accent-foreground",
};

export const MenuSection = ({
  categories,
  items,
}: {
  categories: Category[];
  items: MenuItem[];
}) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!active && categories.length) setActive(categories[0].id);
  }, [categories, active]);

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return items.filter(
      (i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q),
    );
  }, [query, items]);

  useEffect(() => {
    if (filtered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered, categories]);

  const scrollToCategory = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="menu" className="bg-background py-12 md:py-20">
      <div className="container max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Our Menu</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">Eat. Drink. Unwind.</h2>
          <p className="mt-3 text-muted-foreground">Tap a category or search to find your favourite.</p>
        </div>

        <div className="relative mx-auto mb-4 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 rounded-full border-border bg-card pl-10"
          />
        </div>

        {!filtered && categories.length > 0 && (
          <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container max-w-5xl px-0">
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => scrollToCategory(c.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-smooth",
                      active === c.id
                        ? "border-accent bg-accent text-accent-foreground shadow-soft"
                        : "border-border bg-card text-foreground hover:border-accent",
                    )}
                  >
                    {c.emoji && <span className="mr-1.5">{c.emoji}</span>}
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {filtered ? (
          <div>
            <h3 className="mb-4 font-display text-2xl font-bold">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </h3>
            {filtered.length === 0 ? (
              <p className="rounded-xl bg-muted p-8 text-center text-muted-foreground">
                Nothing matches "{query}". Try another word.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filtered.map((item) => <MenuCard key={item.id} item={item} />)}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((c) => {
              const catItems = items.filter((i) => i.category_id === c.id);
              if (catItems.length === 0) return null;
              return (
                <div
                  key={c.id}
                  id={c.id}
                  ref={(el) => (sectionRefs.current[c.id] = el)}
                  className="scroll-mt-32"
                >
                  <div className="mb-4 flex items-center gap-2">
                    {c.emoji && <span className="text-2xl">{c.emoji}</span>}
                    <h3 className="font-display text-2xl font-bold md:text-3xl">{c.name}</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {catItems.map((item) => <MenuCard key={item.id} item={item} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const MenuCard = ({ item }: { item: MenuItem }) => (
  <article
    className={cn(
      "group relative flex gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-soft transition-smooth hover:border-accent hover:shadow-elegant",
      item.sold_out && "opacity-60",
    )}
  >
    {item.image_url && (
      <img
        src={item.image_url}
        alt={item.name}
        loading="lazy"
        className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
      />
    )}
    <div className="flex min-w-0 flex-1 flex-col py-1">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold leading-tight">{item.name}</h4>
        <span className="shrink-0 font-display text-lg font-bold text-accent">
          {formatNaira(item.price)}
        </span>
      </div>
      {item.description && (
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      )}
      {(item.tags?.length || item.sold_out) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.sold_out && <Badge className="bg-muted text-muted-foreground">Sold out</Badge>}
          {item.tags?.map((t) => (
            <Badge key={t} className={cn("capitalize", tagStyles[t])}>
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  </article>
);
