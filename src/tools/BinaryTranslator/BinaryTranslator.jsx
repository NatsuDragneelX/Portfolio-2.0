"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

function textToBinary(text) {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary) {
  const chunks = binary.trim().split(/\s+/).filter(Boolean);
  if (chunks.length === 0) return "";
  for (const chunk of chunks) {
    if (!/^[01]{8}$/.test(chunk)) {
      throw new Error("Binary input must be 8-bit values separated by spaces.");
    }
  }
  return chunks.map((chunk) => String.fromCharCode(parseInt(chunk, 2))).join("");
}

export function BinaryTranslator() {
  const [textInput, setTextInput] = React.useState("");
  const [binaryInput, setBinaryInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState("");

  const copy = async (value, key) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      /* ignore clipboard errors */
    }
  };

  const translateToBinary = () => {
    setError("");
    setBinaryInput(textToBinary(textInput));
  };

  const translateToText = () => {
    try {
      setError("");
      setTextInput(binaryToText(binaryInput));
    } catch (err) {
      setError(err.message || "Invalid binary input.");
    }
  };

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <label htmlFor="binary-text" className="text-sm font-medium">
          Plain text
        </label>
        <Textarea
          id="binary-text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          rows={5}
          placeholder="Type text to convert into binary..."
          className="resize-y text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={translateToBinary}>
          Convert text to binary
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => copy(textInput, "text")}
          disabled={!textInput}
        >
          <Copy className="h-4 w-4" />
          {copied === "text" ? "Copied text" : "Copy text"}
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor="binary-code" className="text-sm font-medium">
          Binary (8-bit chunks)
        </label>
        <Textarea
          id="binary-code"
          value={binaryInput}
          onChange={(e) => setBinaryInput(e.target.value)}
          rows={6}
          placeholder="01001000 01101001"
          className="resize-y font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Use groups like `01001000` separated by spaces.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={translateToText}>
          Convert binary to text
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => copy(binaryInput, "binary")}
          disabled={!binaryInput}
        >
          <Copy className="h-4 w-4" />
          {copied === "binary" ? "Copied binary" : "Copy binary"}
        </Button>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
