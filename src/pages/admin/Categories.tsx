import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCategories, type Category } from "@/hooks/useVenueData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const empty = { name: "", emoji: "", sort_order: 0 };

const Categories = () => {
  const [refresh, setRefresh] = useState(0);
  const { data, loading } = useCategories(refresh);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, sort_order: (data[data.length - 1]?.sort_order ?? 0) + 1 });
    setOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({ name: c.name, emoji: c.emoji || "", sort_order: c.sort_order });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const payload = { name: form.name, emoji: form.emoji || null, sort_order: form.sort_order };
    const { error } = editing
      ? await supabase.from("categories").update(payload).eq("id", editing.id)
      : await supabase.from("categories").insert(payload);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Category updated" : "Category added" });
    setOpen(false);
    setRefresh((r) => r + 1);
  };

  const remove = async (c: Category) => {
    if (!confirm(`Delete category "${c.name}"? Items in it will become uncategorised.`)) return;
    const { error } = await supabase.from("categories").delete().eq("id", c.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Category deleted" });
    setRefresh((r) => r + 1);
  };

  return (
    <div>
      <header className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground">Menu sections shown on the public site.</p>
        </div>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent-glow">
          <Plus className="h-4 w-4" /> New
        </Button>
      </header>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>
      ) : (
        <div className="space-y-2">
          {data.map((c) => (
            <Card key={c.id} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.emoji || "—"}</span>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">Order #{c.sort_order}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(c)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
          {data.length === 0 && (
            <p className="rounded-xl bg-muted p-8 text-center text-muted-foreground">No categories yet. Add one above.</p>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit category" : "New category"}</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-[1fr_120px] gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input id="emoji" value={form.emoji} maxLength={4} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🔥" />
              </div>
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

export default Categories;
