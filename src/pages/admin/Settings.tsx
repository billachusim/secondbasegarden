import { useEffect, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings, type Settings as TSettings } from "@/hooks/useVenueData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [refresh, setRefresh] = useState(0);
  const { data, loading } = useSettings(refresh);
  const [form, setForm] = useState<Partial<TSettings>>({});
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = <K extends keyof TSettings>(k: K, v: TSettings[K]) => setForm((f) => ({ ...f, [k]: v }));

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `hero/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("menu-images").upload(path, file);
      if (error) throw error;
      const { data: pub } = supabase.storage.from("menu-images").getPublicUrl(path);
      set("hero_image_url", pub.publicUrl);
      toast({ title: "Hero image uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setBusy(true);
    const { id, ...rest } = form as TSettings;
    const { error } = await supabase.from("settings").update(rest).eq("id", data.id);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Settings saved" });
    setRefresh((r) => r + 1);
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>;
  }

  return (
    <form onSubmit={save} className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold">Venue Settings</h1>
        <p className="text-sm text-muted-foreground">Information shown across the public site.</p>
      </header>

      <Card>
        <CardHeader><CardTitle className="text-base">Branding</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Venue name" id="name">
            <Input id="name" value={form.venue_name || ""} onChange={(e) => set("venue_name", e.target.value)} />
          </Field>
          <Field label="Tagline" id="tagline">
            <Textarea id="tagline" rows={2} value={form.tagline || ""} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Hero image">
            <div className="flex items-center gap-3">
              {form.hero_image_url && (
                <img src={form.hero_image_url} alt="" className="h-20 w-32 rounded-lg object-cover" />
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm hover:bg-secondary">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </label>
              {form.hero_image_url && (
                <Button type="button" variant="ghost" size="sm" onClick={() => set("hero_image_url", "")}>Reset</Button>
              )}
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Contact</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Address" id="address">
            <Textarea id="address" rows={2} value={form.address || ""} onChange={(e) => set("address", e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone" id="phone">
              <Input id="phone" value={form.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="+234..." />
            </Field>
            <Field label="WhatsApp number (no +)" id="whatsapp">
              <Input id="whatsapp" value={form.whatsapp || ""} onChange={(e) => set("whatsapp", e.target.value)} placeholder="2348012345678" />
            </Field>
          </div>
          <Field label="Hours" id="hours">
            <Input id="hours" value={form.hours || ""} onChange={(e) => set("hours", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Map & Reviews</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Google Maps embed URL" id="embed" hint='From Google Maps → Share → Embed → src="..."'>
            <Input id="embed" value={form.map_embed || ""} onChange={(e) => set("map_embed", e.target.value)} />
          </Field>
          <Field label='"Get Directions" link' id="mapslink">
            <Input id="mapslink" value={form.maps_link || ""} onChange={(e) => set("maps_link", e.target.value)} />
          </Field>
          <Field label="Google Review link" id="review">
            <Input id="review" value={form.review_link || ""} onChange={(e) => set("review_link", e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Socials</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Field label="Instagram" id="ig"><Input id="ig" value={form.instagram || ""} onChange={(e) => set("instagram", e.target.value)} /></Field>
          <Field label="Facebook" id="fb"><Input id="fb" value={form.facebook || ""} onChange={(e) => set("facebook", e.target.value)} /></Field>
          <Field label="TikTok" id="tt"><Input id="tt" value={form.tiktok || ""} onChange={(e) => set("tiktok", e.target.value)} /></Field>
        </CardContent>
      </Card>

      <div className="sticky bottom-3 z-10 flex justify-end">
        <Button type="submit" disabled={busy} size="lg" className="bg-accent text-accent-foreground shadow-elegant hover:bg-accent-glow">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}Save changes
        </Button>
      </div>
    </form>
  );
};

const Field = ({
  label,
  id,
  hint,
  children,
}: {
  label: string;
  id?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export default Settings;
