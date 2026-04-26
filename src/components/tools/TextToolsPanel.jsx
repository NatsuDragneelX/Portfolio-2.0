"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Eraser, Sparkles } from "lucide-react";

const WPM = 200;

function sentenceCase(text) {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase());
}

function titleCaseWords(text) {
  return text
    .toLowerCase()
    .split(/(\s+)/)
    .map((word) => {
      if (/^\s+$/.test(word) || !word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

function capitalizeEachWord(text) {
  return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function countWords(text) {
  const match = text.trim().match(/[^\s]+/g);
  return match ? match.length : 0;
}

function countSentences(text) {
  const parts = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return text.trim() ? parts.length : 0;
}

function countParagraphs(text) {
  const blocks = text.split(/\n\s*\n/).filter((b) => b.trim().length > 0);
  return text.trim() ? blocks.length : 0;
}

function normalizeWhitespace(text) {
  return text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function removeLineBreaks(text) {
  return text.replace(/\s*\n\s*/g, " ").replace(/[ \t]+/g, " ").trim();
}

function removeExtraBlankLines(text) {
  return text.replace(/\n{3,}/g, "\n\n");
}

export function TextToolsPanel() {
  const [text, setText] = React.useState("");
  const [activeMode, setActiveMode] = React.useState("case");
  const [copied, setCopied] = React.useState(false);

  const stats = React.useMemo(() => {
    const words = countWords(text);
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    const reading =
      words === 0 ? "—" : words / WPM < 1 ? "< 1 min" : `${Math.ceil(words / WPM)} min read`;

    return { words, chars, charsNoSpace, sentences, paragraphs, reading };
  }, [text]);

  const apply = (fn) => setText((current) => fn(current));
  const quickSample =
    "this is a sample paragraph. it has inconsistent CASE and   extra spaces.\n\nsecond line here!";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore clipboard failures */
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border/60 bg-card/25 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Text Studio
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
          Write once, edit with tools
        </h3>
        <p className="text-sm text-muted-foreground">
          Use the same text box for case conversion, cleaning, and instant statistics.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.35fr,1fr]">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="text-tools-input" className="text-sm font-medium text-foreground">
              Your text
            </label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setText(quickSample)}>
                <Sparkles className="h-3.5 w-3.5" />
                Sample
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setText("")} disabled={!text}>
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            id="text-tools-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            placeholder="Paste, draft, or clean text here..."
            className="min-h-[18rem] resize-y bg-background/60 leading-relaxed"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>Reading time assumes ~{WPM} words per minute.</p>
            <Button type="button" onClick={copy} size="sm" className="gap-2" disabled={!text}>
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy text"}
            </Button>
          </div>
        </section>

        <aside className="space-y-4 rounded-2xl border border-border/60 bg-card/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Live stats
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Words", value: stats.words },
              { label: "Chars", value: stats.chars },
              { label: "No spaces", value: stats.charsNoSpace },
              { label: "Sentences", value: stats.sentences },
              { label: "Paragraphs", value: stats.paragraphs },
              { label: "Reading", value: stats.reading },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                <p className="truncate text-sm font-semibold text-foreground">{item.value}</p>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Tip</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose a mode below and apply transformations in one click.
            </p>
          </div>
        </aside>
      </div>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Action modes
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { id: "case", label: "Case", desc: "Upper, lower, title" },
              { id: "clean", label: "Clean", desc: "Trim and normalize" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode.id)}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  activeMode === mode.id
                    ? "border-border/70 bg-muted/40"
                    : "border-border/60 bg-card/35 hover:bg-card/50"
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{mode.label}</p>
                <p className="text-xs text-muted-foreground">{mode.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {activeMode === "case" ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply((v) => v.toUpperCase())}
            >
              UPPERCASE
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply((v) => v.toLowerCase())}
            >
              lowercase
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply(titleCaseWords)}
            >
              Title Case
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply(sentenceCase)}
            >
              Sentence case
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply(capitalizeEachWord)}
            >
              Capitalize Each Word
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                apply((v) =>
                  v.replace(/\b\w+\b/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
                )
              }
            >
              Smart Capitalize
            </Button>
          </div>
        ) : null}

        {activeMode === "clean" ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply(normalizeWhitespace)}
            >
              Normalize spaces
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply(removeLineBreaks)}
            >
              Remove line breaks
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => apply(removeExtraBlankLines)}
            >
              Fix blank lines
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setText((v) => v.trim())}
            >
              Trim edges
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
