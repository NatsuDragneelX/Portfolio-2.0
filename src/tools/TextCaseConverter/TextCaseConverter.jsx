"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

function sentenceCase(text) {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase());
}

function titleCaseWords(text) {
  return text
    .toLowerCase()
    .split(/(\s+)/)
    .map((w) => {
      if (/^\s+$/.test(w)) return w;
      if (!w) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join("");
}

function capitalizeEachWord(text) {
  return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function TextCaseConverter() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const apply = (fn) => {
    setText((t) => fn(t));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const btnClass = "min-w-0 flex-1 sm:flex-none";

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <label htmlFor="tcc-input" className="text-sm font-medium">
          Your text
        </label>
        <Textarea
          id="tcc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste or type something to transform…"
          className="resize-y font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          className={btnClass}
          onClick={() => apply((t) => t.toUpperCase())}
        >
          UPPERCASE
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={btnClass}
          onClick={() => apply((t) => t.toLowerCase())}
        >
          lowercase
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={btnClass}
          onClick={() => apply(titleCaseWords)}
        >
          Title Case
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={btnClass}
          onClick={() => apply(sentenceCase)}
        >
          Sentence case
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={btnClass}
          onClick={() => apply(capitalizeEachWord)}
        >
          Capitalize Each Word
        </Button>
      </div>

      <Button type="button" onClick={copy} className="gap-2">
        <Copy className="h-4 w-4" />
        {copied ? "Copied" : "Copy result"}
      </Button>
    </div>
  );
}
