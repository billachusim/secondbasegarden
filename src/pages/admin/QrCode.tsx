import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/useVenueData";
import { toast } from "@/hooks/use-toast";

const QrCode = () => {
  const { data: settings } = useSettings();
  const [url, setUrl] = useState(window.location.origin);
  const [size, setSize] = useState(512);
  const wrapRef = useRef<HTMLDivElement>(null);

  const venueName = settings?.venue_name || "2nd Baze Garden";

  const downloadPng = () => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Wrap canvas in a printable card with the venue name
    const padding = 80;
    const headerH = 110;
    const footerH = 90;
    const out = document.createElement("canvas");
    out.width = canvas.width + padding * 2;
    out.height = canvas.height + padding * 2 + headerH + footerH;
    const ctx = out.getContext("2d")!;

    // Background
    ctx.fillStyle = "#fbf7ee";
    ctx.fillRect(0, 0, out.width, out.height);

    // Header
    ctx.fillStyle = "#1a3a2a";
    ctx.font = "bold 56px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(venueName, out.width / 2, padding + 60);

    // QR
    ctx.drawImage(canvas, padding, padding + headerH);

    // Footer
    ctx.fillStyle = "#1a3a2a";
    ctx.font = "600 36px Inter, sans-serif";
    ctx.fillText("Scan to view our menu", out.width / 2, out.height - footerH / 2 + 8);
    ctx.font = "400 24px Inter, sans-serif";
    ctx.fillStyle = "#7a7a6a";
    ctx.fillText(url.replace(/^https?:\/\//, ""), out.width / 2, out.height - 30);

    out.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${venueName.toLowerCase().replace(/\s+/g, "-")}-menu-qr.png`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast({ title: "QR code downloaded" });
    }, "image/png");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast({ title: "Link copied" });
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold">QR Code</h1>
        <p className="text-sm text-muted-foreground">Generate a printable QR for table tents and posters.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader><CardTitle className="text-base">Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL the QR points to</Label>
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Defaults to the current site address. Customers scan this to open the menu.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">QR size: {size}px</Label>
              <Input
                id="size"
                type="range"
                min={256}
                max={1024}
                step={64}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={downloadPng} className="bg-accent text-accent-foreground hover:bg-accent-glow">
                <Download className="h-4 w-4" /> Download PNG
              </Button>
              <Button variant="outline" onClick={copyLink}>
                <LinkIcon className="h-4 w-4" /> Copy link
              </Button>
              <Button asChild variant="outline">
                <a href={url} target="_blank" rel="noreferrer">Open link</a>
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Print at A6 (105×148 mm) or larger so the QR
              stays scannable from across the table.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Preview</CardTitle></CardHeader>
          <CardContent>
            <div
              ref={wrapRef}
              className="mx-auto flex w-full max-w-[300px] flex-col items-center rounded-2xl border border-border bg-background p-5 text-center shadow-soft"
            >
              <div className="font-display text-xl font-bold text-primary">{venueName}</div>
              <div className="mt-3">
                <QRCodeCanvas
                  value={url}
                  size={size > 240 ? 240 : size}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#1a3a2a"
                />
              </div>
              <div className="mt-3 text-sm font-semibold">Scan to view our menu</div>
              <div className="mt-1 break-all text-xs text-muted-foreground">{url.replace(/^https?:\/\//, "")}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QrCode;
