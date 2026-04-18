import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories, useMenuItems, formatNaira, type MenuItem } from "@/hooks/useVenueData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TAGS = ["popular", "new", "spicy"] as const;

const empty = {
  name: "",
  description: "",
  price: 0,
  category_id: "",
  image_url: "",
  sold_out: false,
  tags: [] as string[],
  sort_order: 0,
};

const MenuItems = () => {
  const [refresh, setRefresh] = useState(0);
  const { data: items, loading } = useMenuItems(refresh);
  const { data: categories } = useCategories(refresh);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");

  const visible = filterCat === "all" ? items : items.filter((i) => i.category_id === filterCat);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, category_id: filterCat !== "all" ? filterCat : (categories[0]?.id || "") });
    setOpen(true);
  };

  const openEdit = (i: MenuItem) => {
    setEditing(i);
    setForm({
      name: i.name,
      description: i.description || "",
      price: i.price,
      category_id: i.category_id || "",
      image_url: i.image_url || "",
      sold_out: i.sold_out,
      tags: i.tags || [],
      sort_order: i.sort_order,
    });
    setOpen(true);
  };

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `items/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("menu-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data: pub } = supabase.storage.from("menu-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: pub.publicUrl }));
      toast({ title: "Image uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      name: form.name,
      description: form.description || null,
      price: form.price,
      category_id: form.category_id || null,
      image_url: form.image_url || null,
      sold_out: form.sold_out,
      tags: form.tags,
      sort_order: form.sort_order,
    };
    const { error } = editing
      ? await supabase.from("menu_items").update(payload).eq("id", editing.id)
      : await supabase.from("menu_items").insert(payload);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Item updated" : "Item added" });
    setOpen(false);
    setRefresh((r) => r + 1);
  };

  const remove = async (i: MenuItem) => {
    if (!confirm(`Delete "${i.name}"?`)) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", i.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Item deleted" });
    setRefresh((r) => r + 1);
  };

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  return (
    <div>
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Menu Items</h1>
          <p className="text-sm text-muted-foreground">{items.length} items total.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.emoji} {c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent-glow">
            <Plus className="h-4 w-4" /> New
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>
      ) : (
        <div className="grid gap-2 md:grid-cols-2">
          {visible.map((i) => {
            const cat = categories.find((c) => c.id === i.category_id);
            return (
              <Card key={i.id} className={cn("flex gap-3 p-3", i.sold_out && "opacity-60")}>
                {i.image_url ? (
                  <img src={i.image_url} alt={i.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">🍽️</div>
                )}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{i.name}</div>
                      <div className="text-xs text-muted-foreground">{cat?.name || "Uncategorised"}</div>
                    </div>
                    <span className="shrink-0 font-bold text-accent">{formatNaira(i.price)}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {i.sold_out && <Badge variant="secondary" className="text-xs">Sold out</Badge>}
                      {i.tags?.map((t) => <Badge key={t} className="text-xs capitalize">{t}</Badge>)}
                    </div>
                    <div className="flex">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(i)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          {visible.length === 0 && (
            <p className="col-span-full rounded-xl bg-muted p-8 text-center text-muted-foreground">No items yet.</p>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit item" : "New item"}</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="space-y-2">
              <Label>Photo</Label>
              <div className="flex items-center gap-3">
                {form.image_url ? (
                  <img src={form.image_url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted text-2xl">🍽️</div>
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm hover:bg-secondary">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  Upload image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                  />
                </label>
                {form.image_url && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setForm({ ...form, image_url: "" })}>
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input id="price" type="number" min={0} step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Sort order</Label>
                <Input id="order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.emoji} {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                {TAGS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm capitalize transition-smooth",
                      form.tags.includes(t)
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background hover:border-accent",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-input p-3">
              <div>
                <div className="font-medium">Sold out</div>
                <div className="text-xs text-muted-foreground">Hide as available on the menu.</div>
              </div>
              <Switch checked={form.sold_out} onCheckedChange={(v) => setForm({ ...form, sold_out: v })} />
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

export default MenuItems;
