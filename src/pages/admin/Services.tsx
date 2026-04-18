import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useServices, type Service } from "@/hooks/useVenueData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const empty = { title: "", description: "", emoji: "", sort_order: 0 };

const Services = () => {
  const [refresh, setRefresh] = useState(0);
  const { data, loading } = useServices(refresh);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, sort_order: (data[data.length - 1]?.sort_order ?? 0) + 1 });
    setOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title,
      description: s.description || "",
      emoji: s.emoji || "",
      sort_order: s.sort_order,
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      emoji: form.emoji || null,
      sort_order: form.sort_order,
    };
    const { error } = editing
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Service updated" : "Service added" });
    setOpen(false);
    setRefresh((r) => r + 1);
  };

  const remove = async (s: Service) => {
    if (!confirm(`Delete "${s.title}"?`)) return;
    const { error } = await supabase.from("services").delete().eq("id", s.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Service deleted" });
    setRefresh((r) => r + 1);
  };

  return (
    <div>
      <header className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Services</h1>
          <p className="text-sm text-muted-foreground">Cards shown in the Services section.</p>
        </div>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent-glow">
          <Plus className="h-4 w-4" /> New
        </Button>
      </header>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-2xl">{s.emoji}</div>
                  <div className="mt-1 font-display text-lg font-bold">{s.title}</div>
                </div>
                <div className="flex">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(s)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
              {s.description && <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>}
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit service" : "New service"}</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-[1fr_120px] gap-3">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input id="emoji" value={form.emoji} maxLength={4} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Sort order</Label>
              <Input id="order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={busy} className="bg-accent text-accent-foreground hover:bg-accent-glow">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
