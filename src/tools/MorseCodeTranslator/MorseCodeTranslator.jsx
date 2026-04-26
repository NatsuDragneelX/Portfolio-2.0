"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

const CHAR_TO_MORSE = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "'": ".----.",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
};

const MORSE_TO_CHAR = Object.fromEntries(
  Object.entries(CHAR_TO_MORSE).map(([key, value]) => [value, key])
);

function textToMorse(text) {
  return text
    .toUpperCase()
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => CHAR_TO_MORSE[char] ?? "?")
        .join(" ")
    )
    .join(" / ");
}

function morseToText(morse) {
  const words = morse.trim().split(/\s*\/\s*/).filter(Boolean);
  if (words.length === 0) return "";

  return words
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => MORSE_TO_CHAR[code] ?? "?")
        .join("")
    )
    .join(" ");
}

export function MorseCodeTranslator() {
  const [textInput, setTextInput] = React.useState("");
  const [morseInput, setMorseInput] = React.useState("");
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

  return (
    <div className="glass-panel space-y-6 rounded-2xl p-4 sm:p-6">
      <div className="space-y-2">
        <label htmlFor="morse-text" className="text-sm font-medium">
          Plain text
        </label>
        <Textarea
          id="morse-text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          rows={5}
          placeholder="Type text to convert to Morse code..."
          className="resize-y text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setMorseInput(textToMorse(textInput))}>
          Convert text to Morse
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
        <label htmlFor="morse-code" className="text-sm font-medium">
          Morse code
        </label>
        <Textarea
          id="morse-code"
          value={morseInput}
          onChange={(e) => setMorseInput(e.target.value)}
          rows={6}
          placeholder=".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
          className="resize-y font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Separate letters with spaces and words with `/`.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setTextInput(morseToText(morseInput))}>
          Convert Morse to text
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => copy(morseInput, "morse")}
          disabled={!morseInput}
        >
          <Copy className="h-4 w-4" />
          {copied === "morse" ? "Copied Morse" : "Copy Morse"}
        </Button>
      </div>
    </div>
  );
}
