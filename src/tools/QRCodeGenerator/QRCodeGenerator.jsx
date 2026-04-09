"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
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
    <div className="glass-panel mx-auto max-w-md space-y-6 rounded-2xl p-4 sm:p-6">
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
      <Button type="button" onClick={generate} className="w-full sm:w-auto">
        Generate QR
      </Button>

      <div className={styles.canvasWrap}>
        <QRCodeCanvas
          ref={canvasRef}
          value={value}
          size={220}
          level="M"
          fgColor={fg}
          bgColor={bg}
          marginSize={2}
        />
      </div>

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
  );
}
