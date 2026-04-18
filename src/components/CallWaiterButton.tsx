import { useEffect, useState } from "react";
import { Phone, Receipt, X, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { venue } from "@/data/menu";

const TABLE_KEY = "2bg-table";

const buildWhatsAppLink = (table: string, message: string) => {
  const tableNote = table ? ` (Table ${table})` : "";
  const text = encodeURIComponent(`Hi 2nd Baze Garden${tableNote} — ${message}`);
  return `https://wa.me/${venue.whatsapp}?text=${text}`;
};

export const CallWaiterButton = () => {
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(TABLE_KEY);
    if (saved) setTable(saved);
  }, []);

  const saveTable = (val: string) => {
    setTable(val);
    if (val) localStorage.setItem(TABLE_KEY, val);
    else localStorage.removeItem(TABLE_KEY);
  };

  const actions = [
    { icon: Phone, label: "Call a waiter", message: "please send a waiter to my table." },
    { icon: Receipt, label: "Request the bill", message: "please bring the bill." },
    { icon: Wine, label: "Order shisha", message: "I'd like to order shisha." },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          aria-label="Call a waiter"
          className="fixed bottom-5 right-5 z-40 h-14 rounded-full bg-accent px-6 text-accent-foreground font-semibold shadow-elegant hover:bg-accent-glow animate-pulse-glow md:bottom-8 md:right-8"
        >
          <Phone className="h-5 w-5" />
          Call Waiter
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 bg-card pb-8">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl">Need help?</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Send a quick WhatsApp to our team — they'll come right over.
          </p>
        </SheetHeader>

        <div className="mt-5 space-y-2">
          <Label htmlFor="table-num">Your table number</Label>
          <Input
            id="table-num"
            inputMode="numeric"
            placeholder="e.g. 12"
            value={table}
            onChange={(e) => saveTable(e.target.value)}
            className="h-12 text-base"
          />
          <p className="text-xs text-muted-foreground">Saved on this device for next time.</p>
        </div>

        <div className="mt-5 space-y-2">
          {actions.map(({ icon: Icon, label, message }) => (
            <a
              key={label}
              href={buildWhatsAppLink(table, message)}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-smooth hover:border-accent hover:bg-accent/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-medium">{label}</span>
            </a>
          ))}
        </div>

        <Button
          variant="ghost"
          className="mt-3 w-full"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" /> Cancel
        </Button>
      </SheetContent>
    </Sheet>
  );
};
