"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, QrCode } from "lucide-react";
import styles from "./QRCodeGenerator.module.css";

export function QRCodeGenerator() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [text, setText] = React.useState("https://patelshivam.org");
  const [value, setValue] = React.useState("https://patelshivam.org");
  const canvasRef = React.useRef(null);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const fg = isDark ? "hsl(210 30% 96%)" : "hsl(222 47% 11%)";
  const bg = isDark ? "hsl(222 22% 11%)" : "hsl(220 18% 97%)";

  const generate = () => {
    setValue(text.trim() || " ");
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.toDataURL !== "function") return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="glass-panel mx-auto max-w-3xl space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-md border border-border/60 bg-background/70 p-1.5">
            <QrCode className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">QR Output</p>
            <p className="text-xs text-muted-foreground">Generate and download a scannable PNG</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="qr-text" className="text-sm font-medium">
          Text or URL
        </label>
        <Textarea
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Type anything to encode…"
          className="resize-none"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="button" onClick={generate} className="w-full sm:w-auto">
          Generate QR
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full gap-2 sm:w-auto"
          onClick={downloadPng}
        >
          <Download className="h-4 w-4" />
          Download PNG
        </Button>
      </div>

      <div className={styles.canvasWrap}>
        <div className={styles.canvasSpotlight} aria-hidden />
        <QRCodeCanvas
          ref={canvasRef}
          value={value}
          size={280}
          level="M"
          fgColor={fg}
          bgColor={bg}
          marginSize={2}
        />
      </div>
    </div>
  );
}
