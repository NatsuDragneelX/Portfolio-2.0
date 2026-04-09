"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import styles from "./WordCounter.module.css";

const WPM = 200;

function countWords(text) {
  const m = text.trim().match(/[^\s]+/g);
  return m ? m.length : 0;
}

function countSentences(text) {
  const parts = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return text.trim() ? parts.length : 0;
}

function countParagraphs(text) {
  const blocks = text.split(/\n\s*\n/).filter((b) => b.trim().length > 0);
  if (!text.trim()) return 0;
  return blocks.length;
}

export function WordCounter() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const words = countWords(text);
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const minutes = words / WPM;
  const reading =
    words === 0
      ? "—"
      : minutes < 1
        ? "< 1 min"
        : `${Math.ceil(minutes)} min read`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <label htmlFor="wc-text" className="text-sm font-medium">
          Text
        </label>
        <Textarea
          id="wc-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Paste or write something…"
          className="resize-y text-sm leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: chars },
          { label: "No spaces", value: charsNoSpace },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
          { label: "Reading", value: reading, mono: false },
        ].map((s) => (
          <div key={s.label} className={styles.stat}>
            <div
              className={styles.statValue}
              style={s.mono === false ? { fontSize: "1rem" } : undefined}
            >
              {typeof s.value === "number" ? s.value : s.value}
            </div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Reading time assumes ~{WPM} words per minute.
      </p>

      <Button type="button" onClick={copy} className="gap-2" disabled={!text}>
        <Copy className="h-4 w-4" />
        {copied ? "Copied" : "Copy text"}
      </Button>
    </div>
  );
}
